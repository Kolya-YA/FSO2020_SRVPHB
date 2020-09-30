require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

morgan.token('post-load', req => {
  return JSON.stringify(req.body)
})
const postStr = ':method :url :status :res[content-length] - :response-time ms :post-load'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan('tiny', {
  skip: req => req.method === 'POST'
}))

app.use(morgan(postStr, {
  skip: req => req.method !== 'POST'
}))

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

const generateNewId = () => Math.ceil(Math.random() * 100000)

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'Name or number missing'
    })
  }
  
  // if (persons.some(p => p.name === body.name)) {
  //   return res.status(400).json({ 
  //     error: 'Name must be unique'
  //   })
  // }
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(addedPerson => {
    res.json(addedPerson)
  })
})

app.get('/info', (req, res) => {
  const resString = `
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date()}</p>
  `
  res.send(resString)
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
      })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => {
      console.error('Request error: ', error)
      res.status(400).send({ error: 'Malformatted ID', name: error.name, message: error.message})
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => {
      console.error('Request error: ', error)
      res.status(400).send({ error: 'Malformatted ID', name: error.name, message: error.message})
    })
  // persons = persons.filter(p => p.id !== id)
  // res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
