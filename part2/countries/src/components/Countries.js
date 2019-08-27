import React from 'react'
import Country from './Country'
import CountryList from './CountryList'

const Countries = ({countries,filter,handleSetCountryButton}) => {

    let countryList = countries

    if(filter){
        countryList = countries.filter(country =>
            country.name.toLowerCase().includes(filter.toLowerCase())
        )
    }

      if(countryList.length=== 0){
        return(
          <div>
          </div>
        )
      }else if(countryList.length > 10){
        return(
          <div>
            Too many matches, specify another filter
          </div>
        )
      }else if(countryList.length > 1){
        return(
            <CountryList countries={countryList} handleSetCountryButton={handleSetCountryButton}/>
        )
      }else{
        return(
          <Country country={countryList[0]}/>
        )
      }
}

export default Countries
