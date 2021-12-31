import React from 'react'

const Add = ({ addPerson, name, number }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={name[0]} onChange={name[1]}/>
            </div>
            <div>
                number: <input value={number[0]} onChange={number[1]}/>
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default Add