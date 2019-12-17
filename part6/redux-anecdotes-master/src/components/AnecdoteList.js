import React from 'react';
import { incrementVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  //const { anecdotes, filter } = props.store.getState()

  const filterAnecdotes = () => {
    if(props.filter !== ""){
      //console.log(anecdotes.filter(n => n.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1) )
      return props.anecdotes.filter(n => n.content.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1) 
    }else
      return props.anecdotes
    
  }

  const vote = (id) => {
    //console.log('vote', id)
    props.incrementVote(id)
    props.showNotification("You voted for: " + props.anecdotes.find(n => n.id === id).content)
    setTimeout(() =>{
      props.hideNotification()
    }, 5000)
  }


  return (
    <div>
      {filterAnecdotes().map(anecdote =>
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedList = connect(mapStateToProps, {incrementVote, showNotification, hideNotification })(AnecdoteList)

export default ConnectedList