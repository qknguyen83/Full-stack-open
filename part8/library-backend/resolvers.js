const { UserInputError } = require('apollo-server')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'TERCES'

const resolvers = {
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
          const newAuthor = new Author({ name: args.author, bookCount: 0 })
          await newAuthor.save()

          theAuthor = await Author.findOne({ name: args.author })
        }

        newBook = new Book({ ...args, author: theAuthor._id })

        await newBook.save()
        await Author.findOneAndUpdate({ name: args.author }, { bookCount: theAuthor.bookCount + 1 })
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author') })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
