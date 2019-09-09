const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
  })

describe('Blogs are returned properly', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
  })

  test('Verifies that there is a id property', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
  })

})

describe('Valid blogs can be added', () => {

  test('a valid blog can be added ', async () => {
      const newBlog = {
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2
      }  
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const titles = response.body.map(r => r.title)
    
      expect(response.body.length).toBe(initialBlogs.length + 1)
      expect(titles).toContain("Type wars")
  })

  test('a blog without likes will have 0 likes ', async () => {
      const newBlog = {
          title: "Likeless Blog",
          author: "Bobert D. Mortin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/LikeWars.html"
      }  
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const likeAmount = response.body.find(r => r.title === newBlog.title).likes
      expect(likeAmount).toBe(0)
  })

})

describe('Blogs with missing data', () => {

  test('a blog without title wont be added', async () => {
      const newBlog = {
          author: "Bobert D. Mortin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/LikeWars.html"
      }  
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  })

  test('a blog author title wont be added', async () => {
      const newBlog = {
          title: "Likeless Blog",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/LikeWars.html"
      }  
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  })

})

afterAll(() => {
  mongoose.connection.close()
})