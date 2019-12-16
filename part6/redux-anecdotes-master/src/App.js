import React from 'react';
import { createStore } from 'redux';
import reducer from './reducers/anecdoteReducer'
import { incrementVote, addAnecdote } from './reducers/anecdoteReducer'
import  { useField } from './hooks/index'

const App = (props) => {

  const textInput = useField('text')

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(incrementVote(id))
    
  }

  const add = (content) => {
    console.log('add', content)
    props.store.dispatch(addAnecdote(content))
    
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
      <form onSubmit= {(e) => {
       e.preventDefault()
       add(textInput.fields.value)
       textInput.reset()
       }}>
        <div><input {...textInput.fields} /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App