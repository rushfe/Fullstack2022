import {} from "dotenv/config"
import express from "express";
import morgan from "morgan";
import cors from 'cors'
import Person from "./modules/person.js";

const app = express()

morgan.format('tiny',':method :url :status :res[content-length] - :response-time ms :req[body]')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.get('/', function (req, res) {
  res.send('hello, world!')
})

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons',(request, response) => {
  Person.find({}).then( persons => {
    response.json(persons)
  })
})
//返回info页面，persons的数量和请求时间
app.get('/info',(request, response) => {
  const time = new Date();
  response.send(`Phonebook has info for ${persons.length} people ${time}`)
})
//通过id获取单个person信息，不存在的返回404
app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
    .catch( error => next(error))
    // //请求参数的id是字符串，转换为number
    // const id = Number(request.params.id)
    // //找到并返回对应id的数组项
    // const person = persons.find(person=>person.id === id)

  // if(person){
  //     //如果服务器中有这个person的数组，则返回json
  //     response.json(person)
  // }else{
  //     //服务器不存在返回404,结束响应
  //     response.status(404).end(console.log('404 NOT FOUND'))
  // }
})

app.delete('/api/persons/:id',(request, response,next) => {
  Person.findByIdAndRemove(request.params.id)
  //eslint-disable-next-line
    .then( result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    // const id = Number(request.params.id)
    // //剔除id相同的项,将新数组赋值给persons
    // persons = persons.filter(person => person.id!==id)

  // response.status(204).end(console.log('删除成功'))
})

app.use(express.json())
//eslint-disable-next-line
app.post('/api/persons', (request, response,next) => {
  const body = request.body

  if(!body.name){
    return response.status(400).json({
      error:'name missing'
    })
  }

  const person = new Person({
    name : body.name,
    number : body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJson())
    .then( savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    //eslint-disable-next-line
    .catch( error => {
      return response.status(400).json({
        error : 'name must be unique'
      })
    })
    // const body = request.body
    // //判断名字是不是已经存在
    // const exists = persons.find(person=>person.name===body.name)
    // console.log(exists);
    // //判断名字电话是否为空-名字存在，并返回对应的错误信息
    // if(!body.name){
    //     //名字为空
    //     return response.status(400).json({
    //         error:'name missing'
    //     })
    // }else if(!body.number){
    //     //电话为空
    //     return response.status(400).json({
    //         error:'number missing'
    //     })
    // }else if(exists){
    //     //名字已经存在
    //     return response.status(400).json({
    //         error:`${exists.name} is already exists`
    //     })
    // }
    // //根据来的数据构建新的person
    // const person = {
    //     id: Math.floor(Math.random()*1000),
    //     name: body.name,
    //     number: body.number
    // }
    // //更新persons数组
    // persons = persons.concat(person)
    // //返回响应信息
    // response.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body);
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person)
    .then(updatedPerson => {
      response.json({ updatedPerson })
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
