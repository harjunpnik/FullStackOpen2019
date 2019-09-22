const blogs = [
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 16,
    user: {
    username: "testUser",
    name: "Edgar Martionsson",
    id: "5d7e6307ae82ff0490a09d22"
    },
    id: "5a422a851b54a676234d17f7"
    },
    {
    title: "Today is a great day",
    author: "Edgar Martionsson",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 28,
    user: {
    username: "testUser",
    name: "Edgar Martionsson",
    id: "5d7e6307ae82ff0490a09d22"
    },
    id: "5a422b3a1b54a676234d17f9"
    },
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
    username: "testUser",
    name: "Edgar Martionsson",
    id: "5d7e6307ae82ff0490a09d22"
    },
    id: "5d7e5b1c35ed2c213c7ed56f"
    },
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
    username: "edgar",
    name: "Edgar Martionsson",
    id: "5d7e4cc0ba5e5a2c14b647a7"
    },
    id: "5d7e5c55501dd72fecdcd518"
    },
    {
    title: "React patterns 2",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 20,
    user: {
    username: "edgar",
    name: "Edgar Martionsson",
    id: "5d7e4cc0ba5e5a2c14b647a7"
    },
    id: "5d7e61b8eedfee1b5ce54451"
    },
    {
    title: "Today is a great day",
    author: "Edgar Martionsson",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 23,
    user: {
    username: "testUser",
    name: "Edgar Martionsson",
    id: "5d7e6307ae82ff0490a09d22"
    },
    id: "5d7e64d737b37c3f2830a46b"
    },
    {
    title: "Tomorrow is a better day",
    author: "Edgar Martionsson",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 23,
    user: {
    username: "testUser",
    name: "Edgar Martionsson",
    id: "5d7e6307ae82ff0490a09d22"
    },
    id: "5d7e6a4a7bff163d444aa5d7"
    }
]

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    return Promise.resolve(blogs)
}
  
export default { getAll, setToken }