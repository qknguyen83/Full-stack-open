import React from 'react'
import Person from './Person'

const Display = ({ personsToDisplay }) => {
    return (
        <div>
            {personsToDisplay.map((person) => <Person key={person.id} person={person}/>)}
        </div>
    )
}

export default Display