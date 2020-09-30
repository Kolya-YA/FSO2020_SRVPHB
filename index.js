require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')
const postStr = ':method :url :status :res[content-length] - :response-time ms :post-load'

morgan.token('post-load', req => {
  return JSON.stringify(req.body)
})

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

app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number
  })
  
  newPerson.save()
    .then(addedPerson => {
      res.json(addedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.newNumber },
    { runValidators: true, context: 'query', new: true }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.countDocuments()
    .then(countDoc => {
      const resString = `
      <p>Phonebook has info for <strong>${countDoc}</strong> people.</p>
      <p>${new Date()}</p>
      `
      res.send(resString)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
      })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      person ? res.status(204).end() : res.status(404).end()
    })
    .catch(error => next(error))
})

// Unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, req, res, next) => {
  console.error('Error name: ', error.name)
  console.error('Error message: ', error.message)
  switch (error.name) {
    case 'CastError':
      res.status(400).send({ error: 'Malformatted ID', name: error.name, message: error.message})
      break
    case 'ValidationError':
      res.status(400).send({ name: error.name, message: error.message })
      break
    default:
      next(error)
  }
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})