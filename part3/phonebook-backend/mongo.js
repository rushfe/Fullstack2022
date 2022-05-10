import mongoose from "mongoose";

if(process.argv.length<3){
  console.log("Please provide the password as an argument:node mongo.js <password>");
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://phonebook:${password}@cluster0-shard-00-00.qam0m.mongodb.net:27017,cluster0-shard-00-01.qam0m.mongodb.net:27017,cluster0-shard-00-02.qam0m.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xfsmyv-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name : String,
  number : Number,
})

const Phonebook = mongoose.model('Phonebook',phonebookSchema)

const phonebook = new Phonebook({
  name : name,
  number : number,
})
//eslint-disable-next-line
phonebook.save().then( result => {
  console.log(`add ${name} number ${number} to phonebook`);
  mongoose.connection.close()
})

Phonebook.find({}).then(result => {
  result.forEach(phonebook => {
    console.log(phonebook);
  })
  mongoose.connection.close()
})