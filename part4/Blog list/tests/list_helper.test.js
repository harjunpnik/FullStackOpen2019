const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const blogs = [
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
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]

    //  TOTAL LIKES
  describe('Testing for total likes', () => {  
    test('when list is empty equals 0 likes', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes([blogs[0]])
      expect(result).toBe(7)
    })

    test('when list has several blogs, then it equals to the sum', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
  })
    // FAVORITE BLOG favoriteBlog
  describe('Testing for favorite blog', () => {  
    test('when list is empty, find favorite blog', () => {
        const result = listHelper.favoriteBlog([])
        const expectedResult = {
            title: null,
            author: null,
            likes: null
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has one blog, find favorite blog', () => {
        const result = listHelper.favoriteBlog([blogs[0]])
        const expectedResult = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has several blogs, find favorite blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        const expectedResult = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toStrictEqual(expectedResult)
    })
  })

    //  MOST BLOGS
  describe('Testing for author with most blogs', () => {  
    test('when list is empty, find most blogs', () => {
        const result = listHelper.mostBlogs([])
        const expectedResult = {
            author: null,
            blogs: null
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has one blog, find most blogs', () => {
        const result = listHelper.mostBlogs([blogs[0]])
        const expectedResult = {
            author: "Michael Chan",
            blogs: 1
        }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has several blogs, find most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const expectedResult = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(result).toStrictEqual(expectedResult)
    })
  })

    //  MOST LIKES
  describe('Testing for author with most likes', () => {  
    test('when list is empty, find most liked author', () => {
        const result = listHelper.mostLikes([])
        const expectedResult = {
            author: null,
            likes: null
          }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has one blog, find most liked author', () => {
        const result = listHelper.mostLikes([blogs[0]])
        const expectedResult = {
            author: "Michael Chan",
            likes: 7
          }
        expect(result).toStrictEqual(expectedResult)
    })

    test('when list has several blogs, find most liked author', () => {
        const result = listHelper.mostLikes(blogs)
        const expectedResult = {
            author: "Edsger W. Dijkstra",
            likes: 17
          }
        expect(result).toStrictEqual(expectedResult)
    })
  })
})