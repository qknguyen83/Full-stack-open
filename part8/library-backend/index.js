require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = 'TERCES'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')

      if (!args.author && !args.genre) {
        return books
      }
      else if (args.author && args.genre) {
        return books.filter(book => book.author.name === args.author && book.genres.includes(args.genre))
      }
      else if (!args.author && args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }

      return books.filter(book => book.author.name === args.author)
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({})
      return books.reduce((result, current) => new Set([...result, ...current.genres]), ['all genres'])
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }

      let theAuthor
      let newBook

      try {
        theAuthor = await Author.findOne({ name: args.author })

        if (!theAuthor) {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()

          theAuthor = await Author.findOne({ name: args.author })
        }

        newBook = new Book({ ...args, author: theAuthor._id })

        await newBook.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return newBook.populate('author')
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }

      const theAuthor = await Author.findOne({ name: args.name })

      if (!theAuthor) {
        return null
      }

      theAuthor.born = args.setBornTo

      try {
        theAuthor.save()
      }
      catch (error) {
        console.log(error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return theAuthor
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })

      return newUser.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`)
})
