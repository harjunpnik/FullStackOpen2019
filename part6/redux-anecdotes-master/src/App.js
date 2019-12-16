import React from 'react';
import { createStore } from 'redux';
import reducer from './reducers/anecdoteReducer'
import { incrementVote } from './reducers/anecdoteReducer'

const App = (props) => {
  
  

  const vote = (id) => {
    console.log('vote', id)
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App