import React from 'react'
import Details from './Details'

const Display = ({ countriesToDisplay, showDetails, toggleShowDetails }) => {
    if (countriesToDisplay.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countriesToDisplay.length >= 1 && countriesToDisplay.length <= 10) {
        return (
            <div>
                {countriesToDisplay.map((country, index) => {
                    return (
                        <div key={country.cca3}>
                            <p>{country.name.common} <button onClick={() => toggleShowDetails(index)}>{showDetails[index]? 'hide' : 'show'}</button></p>
                            <Details country={country} showDetails={showDetails[index]}/>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return null
    }
}

export default Display