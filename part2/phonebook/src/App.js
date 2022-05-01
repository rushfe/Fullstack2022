import { useState } from 'react'

const PersonForm = ({addName,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = (props) => {
  const filterValue=props.filterValue
  const setFilterValue = props.setFilterValue
  const persons=props.persons
  const handleValueChange = (event) => {
    setFilterValue(event.target.value)
  }
  return (
    <div>
       <p>filter shown with <input value={filterValue} onChange={handleValueChange} /></p> 
    </div>
  )
}

const Persons = ({newPersons}) => {
   return (
     <>
     {newPersons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
     </>
   )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: '32-44-2442345',id:1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')

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
      number:newNumber
    }

    const isExsits=persons.find(person=>
      person.name.toLowerCase() === addNewName.name.toLowerCase() || person.number.toLowerCase() === addNewName.number.toLowerCase() 
    )
    if(isExsits){
      console.log(persons);
      alert(`${newName} or ${newNumber} is already added to phonebook`)
      setNewName('')
    }else{
      setPersons(persons.concat(addNewName))
    setNewName('')
    }
  }
  const newArr = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const newPersons = newArr? newArr:persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons newPersons={newPersons}/>
    </div>
  )
}

export default App