import React from 'react'

const Countries = ({country}) => {
    
    const languageRows = () =>  country.languages.map (language =>
        <li key={language.name} >{language.name}</li>
    )

    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h3>Languages</h3>
            <ul>
            {languageRows()}
            </ul>
            <img src={country.flag} alt={country.name}  height="75px"/>
        </div>
    )
}

export default Countries
