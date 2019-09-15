const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(user => user.toJSON()))
})

//  POST
userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username : body.username,
            name : body.name,
            passwordHash
        })

        const savedUser = await user.save()
        res.json(savedUser)
    }catch(exception){
        next(exception)
    }
})

module.exports = userRouter