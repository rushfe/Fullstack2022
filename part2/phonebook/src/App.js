import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import getPost from './services/getPost'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [addMessage,setAddMessage]= useState('')
  const [style,setStyle] = useState('added')

  useEffect(()=>{
    getPost
      .getAll()
      .then(response=>{
        setPersons(response)
      })
  },[])

  const deletePerson=(id)=>{
    axios
      .delete(`http://localhost:3001/persons/${id}`)
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const addNewName = {
      name: newName,
      number:newNumber,
      id:persons.length+1
    }
    const isExsits=persons.find(person=>
      person.name.toLowerCase() === addNewName.name.toLowerCase() || person.number.toLowerCase() === addNewName.number.toLowerCase() 
    )
    if(isExsits){
      if(window.confirm(`${addNewName.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPersons=persons.filter(person=>person.name==addNewName.name);
        newPersons[0].number = addNewName.number;
        console.log(newPersons[0].id);
        axios.put(`http://localhost:3001/persons/${newPersons[0].id}`,newPersons[0])
      }
      setNewName('')
      setNewNumber('')
    }else{
        getPost
          .create(addNewName)
          .then(res=>{
            setPersons(persons.concat(res))
          })
      setAddMessage(`Added ${addNewName.name}`)
      setStyle('added')
      setTimeout(() => {
        setAddMessage(null)
      }, 2000);
      setNewName('')
      setNewNumber('')
    }
  }
  const newArr = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const newPersons = newArr? newArr:persons
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addMessage} className={style}/>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newPersons={newPersons} setPersons={setPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App