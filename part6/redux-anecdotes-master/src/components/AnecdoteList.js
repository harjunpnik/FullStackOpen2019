import React from 'react';
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  //const { anecdotes, filter } = props.store.getState()


  const vote = (id) => {
    //console.log('vote', id)
    props.incrementVote(id)
    props.setNotification("You voted for: " + props.filteredAnecdotes.find(n => n.id === id).content, 5000)
  }


  return (
    <div>
      {props.filteredAnecdotes.map(anecdote =>
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

const filterAnecdotes = ({anecdotes, filter}) => {
  if(filter !== ""){
    //console.log(anecdotes.filter(n => n.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1) )
    return anecdotes.filter(n => n.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1) 
  }else
    return anecdotes
  
}


const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    filteredAnecdotes: filterAnecdotes(state),
    filter: state.filter
  }
}

const ConnectedList = connect(mapStateToProps, {incrementVote, setNotification})(AnecdoteList)

export default ConnectedList