const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Todo = require('../../models/todo')

const initialTodos = [
  {
    action: 'Pese pyykit'
  },
  {
    action: 'Rapsuta kissaa'
  }
]

beforeEach(async () => {
  await Todo.deleteMany({})
  for (const todo of initialTodos) {
    let todoObject = new Todo(todo)
    await todoObject.save()
  }

})
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/todos')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Two todos are returned', async () => {
  const response = await api.get('/api/todos')
  expect(response.body).toHaveLength(initialTodos.length)
})

test('Todos contain initial', async () => {
  const response = await api.get('/api/todos')
  const contents = response.body.map(r => r.action)
  console.log(contents)
  expect(contents).toContain(
    'Pese pyykit'
  )
})

afterAll(() => {
  mongoose.connection.close()
})