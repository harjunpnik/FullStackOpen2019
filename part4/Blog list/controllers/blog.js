const blogsRouter =  require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//  GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .find({}).populate('user', { username: 1, name: 1 , id: 1})  
    response.json(blogs.map(blog => blog.toJSON()))
  })

//  POST  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById("5d7e4cc0ba5e5a2c14b647a7")

    if(!body.author){
      return response
              .status(400)
              .send({
                error: 'Author is missing'
              })
    }

    if(!body.title){
      return response
              .status(400)
              .send({
                error: 'Title is missing'
              })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes != undefined ? body.likes : 0,
      user: user._id
    })
  
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
})

//  UPDATE
blogsRouter.put('/:id', async (request, response, next) => {

  try{

    const body = request.body

    const blog = ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes != undefined ? body.likes : 0
    })

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updateBlog.toJSON())

  }catch (exception) {
    next(exception)
  }
})

//  DELETE
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter