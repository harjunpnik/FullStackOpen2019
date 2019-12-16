import React from 'react';
import { incrementVote } from './reducers/anecdoteReducer'
import  { useField } from './hooks/index'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store}/>
      <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App