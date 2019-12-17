import React from 'react';
import { incrementVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes } = props.store.getState()

  const vote = (id) => {
    //console.log('vote', id)
    props.store.dispatch(incrementVote(id))
    props.store.dispatch(showNotification("You voted for: " + anecdotes.find(n => n.id === id).content))
    setTimeout(() =>{
      props.store.dispatch(hideNotification())
    }, 5000)
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
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

export default AnecdoteList