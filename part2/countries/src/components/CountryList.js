import React from 'react'

const CountryList = ({countries}) => {

    const countriesRows = () =>  countries.map (country =>
        <p key={country.name}>{country.name}</p>
      )

    return(
        <div>
            {countriesRows()}
        </div>
    )
}

export default CountryList
