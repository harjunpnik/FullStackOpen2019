import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />

      <Countries 
        countries={countries} 
        filter={filter}
      />
    </div>
  );
}

export default App;
