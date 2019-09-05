var array = require('lodash/array');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog  = (blogs) => {
    let favoriteBlog = {
        title: null,
        author: null,
        likes: null
    }
    let mostLikes = 0

    blogs.forEach( blog =>{
        if(blog.likes> mostLikes){
            mostLikes =  blog.likes
            favoriteBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    let mostBlogs = {
        author: null,
        blogs: null
    }

    array.uniq(authors).forEach( author =>{
        const currentAuthor = authors.filter(auth => auth === author)
        if(currentAuthor.length > mostBlogs.blogs){
            mostBlogs = {
                author: author,
                blogs: currentAuthor.length
            }
        }
    })

    return mostBlogs
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}