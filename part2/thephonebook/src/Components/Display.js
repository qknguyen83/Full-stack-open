import React from 'react'
import Person from './Person'

const Display = ({ personsToDisplay, deletePerson }) => {
    return (
        <div>
            {personsToDisplay.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
        </div>
    )
}

export default Display