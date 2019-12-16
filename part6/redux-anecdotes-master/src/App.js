import React from 'react';
import { incrementVote } from './reducers/anecdoteReducer'
import  { useField } from './hooks/index'
import AnecdoteForm from './components/AnecdoteForm';

const App = (props) => {

  const textInput = useField('text')

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
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App