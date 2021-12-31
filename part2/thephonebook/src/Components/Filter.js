import React from 'react'

const Filter = ({ filter }) => {
    return (
        <div>
            filter contacts with:
            <input value={filter[0]} onChange={filter[1]}/>
        </div>
    )
}

export default Filter