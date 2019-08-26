import React from 'react'

const PersonForm = ({onSubmit, nameValue, handleNameChange, numberValue, handleNumberChange}) => {
    return(
        <form onSubmit={onSubmit}>
        <div>Name: 
          <input
            value={nameValue}
            onChange={handleNameChange}
           />
        </div>
        <div>Number: 
          <input
            value={numberValue}
            onChange={handleNumberChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm