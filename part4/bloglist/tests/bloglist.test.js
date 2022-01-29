const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogsRouter = require('../controllers/blogs')

const api = supertest(app)

beforeAll(done => {
  mongoose.connection.db
    ? done()
    : mongoose.connection.on('connected', done)
})

test('blogs are returned as json', async () => {
  const NUMBER_OF_POSTS = 6
  
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body.length).toBe(NUMBER_OF_POSTS)
})

test('verifying id property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('http post', async () => {
  const blogsAtBegin = await api.get('/api/blogs')
  
  const newBlog = {
    title: 'Nobita S2 Shizuka',
    author: 'Nobita',
    url: 'No URL available',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const temp = await api.get('/api/blogs')
  const blogsAtEnd = temp.body.map(blog => {
    const newBlog = {...blog}
    delete newBlog.id
    return newBlog
  })

  expect(blogsAtEnd.length).toEqual(blogsAtBegin.body.length + 1)
  expect(blogsAtEnd).toContainEqual(newBlog)
})

test('missing likes', async () => {
  const newBlog = {
    title: 'Nobita S2 Shizuka',
    author: 'Nobita',
    url: 'No URL available'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body[blogsAtEnd.body.length-1].likes).toBe(0)
})

test('missing title and url', async () => {
  const blogsAtBegin = await api.get('/api/blogs')

  const newBlog = {
    title: 'Nobita S2 Shizuka',
    author: 'Nobita'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body.length).toBe(blogsAtBegin.body.length)
})

test('http delete', async () => {
  const blogsAtBegin = await api.get('/api/blogs')

  const ID = '61f55fe2c99ec6bd5cb45d6c'
  await api
    .delete('/api/blogs/' + ID)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body.length).toBe(blogsAtBegin.body.length - 1)
})

test('http put', async () => {
  const update = {likes: 38}
  
  const ID = '61f0138d9db235aeabbd463d'
  await api
    .put('/api/blogs/' + ID)
    .send(update)
    .expect(200)

  const blogsAtEnd = await api.get('/api/blogs')
  const updatedBlog = blogsAtEnd.body.find(blog => blog.id === ID)

  expect(updatedBlog.likes).toBe(update.likes)
})

afterAll(() => {
  mongoose.connection.close()
})