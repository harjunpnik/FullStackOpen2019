const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
      _id: "5d7e4cc0ba5e5a2c14b647a7",
      username: "edgar",
      name: "Edgar Martionsson",
      passwordHash: "$2b$10$ssFjttTe.hnoMJ7vBze.jubyagdJvq3xGk0Mbiqa62M4v7ulFPDkq",
      __v: 0
    },
    {
      _id: "5d7e0fe42bcaae069ca6cf62",
      username: "TammiLO",
      name: "Tammi Loberg",
      passwordHash: "$2b$10$ssFjttTe.hnoMJ7vBze.jubyagdJvq3xGk0Mbiqa62M4v7ulFPDkq",
      __v: 0
    },
    {
      _id: "5d7e0fc12bcaae069ca6cf61",
      username: "TommiT",
      name: "Tommi",
      passwordHash: "$2b$10$ssFjttTe.hnoMJ7vBze.jubyagdJvq3xGk0Mbiqa62M4v7ulFPDkq",
      __v: 0
    }
]



beforeEach(async () => {
    await User.deleteMany({})
  
    let userObject = new User(initialUsers[0])
    await userObject.save()
  
    userObject = new User(initialUsers[1])
    await userObject.save()

    userObject = new User(initialUsers[2])
    await userObject.save()
})

describe('Users are returned properly', () => {

    test('Users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('there are three users', async () => {
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(3)
    })
  
    test('Verifies that there is a id property', async () => {
        const response = await api.get('/api/users')
        expect(response.body[0].id).toBeDefined()
    })

    test('Verifies that there is a username property', async () => {
        const response = await api.get('/api/users')
        expect(response.body[0].username).toBeDefined()
    })
  
})

describe('Users with invalid data', () => {

    test('a user without username wont be added', async () => {
        const newUser = {
            username: "",
            name: "Teppo Tosikko",
            password: "password123",
        }  
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username is too short')
    })

    
    test('same username cannot be used twice', async () => {
        const newUser = {
            username: "edgar",
            name: "Edgarness",
            password: "password123",
        }  
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('`username` to be unique')
    })

  
    test('a user with a short password wont be added', async () => {

        const newUser = {
            username: "Alvar",
            name: "Aaltos Alvar",
            password: "1",
        }  
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is too short')

    })
  
  })


afterAll(() => {
    mongoose.connection.close()
})