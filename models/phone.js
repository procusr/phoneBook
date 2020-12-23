const mongoose = require("mongoose");
require("dotenv").config();
const uniqueValidator = require('mongoose-unique-validator')

//mongoose.set('useFindAndModify', false)
//mongoose.set('useCreateIndex', true)


const url = process.env.MONGODB_URI;


console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((result) => {
    console.log("connected to MongoDB", result);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error, error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true,minlength:3 },
  number: { type: Number, required: true, minlength:8},
});

//Format the id and  _V properties
phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

phoneSchema.plugin(uniqueValidator)

//const Phone = mongoose.model('Phone', phoneSchema)

module.exports = mongoose.model("Phone", phoneSchema);
