import React from 'react';
import { incrementVote } from '../reducers/anecdoteReducer'

const App = (props) => {

  const vote = (id) => {
    //console.log('vote', id)
    props.store.dispatch(incrementVote(id))
    
  }


  return (
    <div>
      <h2>Anecdotes</h2>

      {props.store.getState().map(anecdote =>
        <div key={anecdote.id}>

          <div>
            {anecdote.content}
          </div>

          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>

        </div>
      )}

    </div>
  )
}

export default App