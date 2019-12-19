import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'
import  { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const textInput = useField('text')

  const add = async (content) => {
    props.addAnecdote(content)
    props.setNotification("You added: " + content, 5000)
  }

  return (
    <div>
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedForm = connect(mapStateToProps, {addAnecdote, setNotification})(AnecdoteForm)

export default ConnectedForm