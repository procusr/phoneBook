

const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

 console.log('connecting to', url)

 mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB',result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:',error,error.message)
  })

  const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })

  //Format the id and  _V properties
  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  //const Phone = mongoose.model('Phone', phoneSchema)

  module.exports = mongoose.model('Phone', phoneSchema)