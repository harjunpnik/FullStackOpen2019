const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
  ]

//  GET ALL PERSONS
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//  GET PERSON WITH ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else{
        res.status(404).end()
    }
})

//  POST PERSON
app.post('/api/persons', (req, res) => {
    const id = Math.floor((Math.random() * 1000) + 1);
    
    if (!req.body.number || !req.body.name) {
        return res.status(400).json({ 
          error: 'name or number is missing' 
        })
    }

    if(persons.find(person => person.name === req.body.name)) {
        return res.status(400).json({ 
          error: 'name must be unique' 
        })
    }

    const person = {
        name: req.body.name,
        number: req.body.number,
        id: id
      }

    persons = persons.concat(person)

    res.json(person)
  })
//  DELETE PERSON WITH ID
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

//  GET INFO
app.get('/info', (req, res) => {
    res.send(`<div>
        <p>Phonebook has info for ${persons.length} people </p>
        <p>${new Date()}</p>
    </div>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})