import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'
import  { useField } from '../hooks/index'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = (props) => {

  const textInput = useField('text')

  const add = async (content) => {
    //console.log('add', content)
    const newContent = await anecdoteService.create(content)
    props.addAnecdote(content)
    props.showNotification("You added: " + content)
    setTimeout(() =>{
      props.hideNotification()
    }, 5000)
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

const ConnectedForm = connect(mapStateToProps, {addAnecdote, showNotification, hideNotification })(AnecdoteForm)

export default ConnectedForm