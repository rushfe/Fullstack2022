import React from 'react'

const Persons = ({newPersons}) => {
    return (
      <>
      {newPersons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
      </>
    )
 }

 export default Persons