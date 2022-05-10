import React from 'react'

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

  export default Filter