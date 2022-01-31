const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeAll((done) => {
  mongoose.connection.db
    ? done()
    : mongoose.connection.on('connected', done)
})

test('http post', async () => {
  const newUser = {
    username: 'martin1423',
    name: 'Robert C. Martin',
    password: '123456789',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('adding new invalid user', async () => {
  const usersAtBegin = await api.get('/api/users')

  const invalidUser = {
    username: 'qw',
    name: 'vandijk',
    password: 'ash',
  }

  const errors = [
    { error: 'Username must be unique' },
    { error: 'Both username and password must be given' },
    { error: 'Both username and password must be atleast 3 characters long' },
  ]

  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

  expect(errors).toContainEqual(response.body)

  const usersAtEnd = await api.get('/api/users')
  expect(usersAtEnd.body.length).toBe(usersAtBegin.body.length)
})

afterAll(() => {
  mongoose.connection.close()
})
