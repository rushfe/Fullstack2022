import mongoose from "mongoose";

const url = process.env.MONGODB_URI

console.log('connecting to ',url);

mongoose.connect(url)
//eslint-disable-next-line
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB',error.message);
  })

const personSchema = new mongoose.Schema({
  name : {
    type:String,
    minlength:3,
    required: true,
    unique: true
  },

  number :  {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d[0-9]/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON',{
  transform:(document,returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

const Person = mongoose.model('Person',personSchema)

export default Person