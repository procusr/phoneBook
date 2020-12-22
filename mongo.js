const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}



const password = process.argv[2]
const name = process.argv[3]
const number=process.argv[4]

const url =`mongodb+srv://procusr:${password}@cluster0.qj5vn.mongodb.net/phonebook?retryWrites=true&w=majority`
//`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
  name,
  number
})

if (process.argv.length>3){
phone.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})  

}else{

Phone.find({}).then(result => {
    result.forEach(phone => {
      console.log(phone.name,phone.number)
    })
    mongoose.connection.close()
  })

}