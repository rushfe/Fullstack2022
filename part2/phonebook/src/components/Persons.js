import React from 'react'
import axios from 'axios'
import Notification from './Notification'

const Delete = ({person,persons,setPersons,deletePerson}) => {
  const id = person.id
  const handleDeletePerson = () => {
  const newPersons = persons.filter(person=>person.id!==id)
  if(window.confirm(`Delete ${person.name}`)){
    deletePerson(id)
    setPersons(newPersons)
  }
}
  return (
    <button key={id} onClick={handleDeletePerson}>delete</button>
  )
}


const Persons = ({newPersons,setPersons,deletePerson}) => {
    return (
      <>
      {newPersons.map(person=><div key={person.name}>{person.name} {person.number}<Delete person={person} persons={newPersons} setPersons={setPersons} deletePerson={deletePerson}/></div>)}
      </>
    )
 }

 export default Persons