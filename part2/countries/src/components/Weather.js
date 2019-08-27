import React, { useState, useEffect  } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {

    const [ weather, setweather ] = useState('')

    useEffect(() => {
        console.log('effect')
        const apiQuery= 'http://api.apixu.com/v1/current.json?key=519b7da6fb424ce7ab5201642192708&q='+ capital
        axios
          .get(apiQuery)
          .then(response => {
            console.log('promise fulfilled')
            setweather(response.data)
            console.log(response)
          })
      }, [])

    if(weather){  
        return(
            <div>
                <p><b>Temperature:</b> {weather.current.temp_c} Celsius</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text}/>
                <p><b>Wind:</b> {weather.current.wind_kph}  {weather.current.wind_dir}</p>          
            </div>
        )
    }else{
        return(
            <>
            </>
        )
    }
}

export default Weather
