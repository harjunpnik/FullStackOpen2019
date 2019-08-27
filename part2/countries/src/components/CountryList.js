import React from 'react'

const CountryList = ({countries,handleSetCountryButton}) => {

    const countriesRows = () =>  countries.map (country =>
        <p key={country.name}>{country.name} <button onClick={handleSetCountryButton} value={country.name}>Show</button></p>
      )

    return(
        <div>
            {countriesRows()}
        </div>
    )
}

export default CountryList
