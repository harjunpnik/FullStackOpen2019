import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {total}</p>
      <p>Average {(props.good * 1 + props.bad * -1 )/total}</p>
      <p>Positive {props.good / total * 100} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => setGood(good + 1)}> 
          Good 
        </button>
        <button onClick={() => setNeutral(neutral + 1)}> 
          Neutral 
        </button>
        <button onClick={() => setBad(bad + 1)}> 
          Bad 
        </button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)