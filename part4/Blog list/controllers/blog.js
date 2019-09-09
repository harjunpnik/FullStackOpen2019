const blogsRouter =  require('express').Router()
const Blog = require('../models/blog')

//  GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})  
    response.json(blogs.map(blog => blog.toJSON()))
  })

//  POST  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

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
      likes: body.likes != undefined ? body.likes : 0
    })
  
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

// DELETE
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter