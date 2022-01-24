import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './Components/Display'

const App = () => {
  const [countries, setCountries] = useState('')
  const [countriesToDisplay, setCountriesToDisplay] = useState([])
  const [showDetails, setShowDetails] = useState([])

  useEffect(() => {
    if (countries.length === 0) {
      setCountriesToDisplay([])
    }
    else {
      axios
        .get(`https://restcountries.com/v3.1/name/${countries}`)
        .then(response => {
          setCountriesToDisplay(response.data)
          setShowDetails(new Array(response.data.length).fill(false))
        })
        .catch(error => console.log(error))
    }
  }, [countries])

  const toggleShowDetails = (index) => {
    const newShowDetails = [...showDetails]
    newShowDetails[index] = !showDetails[index]
    setShowDetails(newShowDetails)
  }

  const handleCountries = (event) => {
    setCountries(event.target.value)
  }

  return (
    <div>
      <div>
        Find countries <input value={countries} onChange={handleCountries}/>
      </div>
      <Display countriesToDisplay={countriesToDisplay} showDetails={showDetails} toggleShowDetails={toggleShowDetails}/>
    </div>
  )
}

export default App