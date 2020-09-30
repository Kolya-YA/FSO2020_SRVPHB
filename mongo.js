const mongoose = require('mongoose')

const showPhonebook = () => {
  console.log('Phonebook:')
  Person.find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch(err => console.log(`Show error ${err}`))
}

const addNewPerson = (name, number) => {
  const personToAdd = new Person({ name, number })
  personToAdd.save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
    .catch(err => console.log(`Add error ${err}`))
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const dbUrl = `mongodb+srv://phb_user:${password}@cluster0.knx84.mongodb.net/phonebook_app?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


console.log('Gogogoga')

process.argv.length === 3
  ? showPhonebook()
  : addNewPerson(process.argv[3], process.argv[4])