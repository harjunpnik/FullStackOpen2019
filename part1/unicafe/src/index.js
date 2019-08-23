import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Statistic = (props) =>(
    <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.bad * -1 )/total
  const positive = props.good / total * 100 + "%"

  if(total >0){
  return (
    <div>
      <Statistic text="Good" value ={props.good} />
      <Statistic text="Neutral" value ={props.neutral} />
      <Statistic text="Bad" value ={props.bad} />
      <Statistic text="All" value ={total} />
      <Statistic text="Average" value ={average} />
      <Statistic text="Positive" value ={positive} />
    </div>
  )
  }else{
    return(
        <div>
            <p>No feedback given</p>
        </div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text="Good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"/>
        <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)