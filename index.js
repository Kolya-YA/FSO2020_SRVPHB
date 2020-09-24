const express = require('express')
const app = express()
// app.use(express.json())

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

app.get('/info', (req, res) => {
  const resString = `
  <p>Phonebook has info for ${persons.length} people.</p>
  <p>${new Date()}</p>
  `
  res.send(resString)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const person = persons.find(p => p.id === id)
  if (!person) return res.status(404).end()
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})