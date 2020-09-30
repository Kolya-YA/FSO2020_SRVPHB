const mongoose = require('mongoose')

const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log(`Erro connecting to MongoDB ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    console.log('Doc: ', document)
    console.log('Ret Obj: ', returnedObject)
  }
})

module.exports = mongoose.model('Person', personSchema)