import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer'
import  { useField } from '../hooks/index'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const textInput = useField('text')

  const add = (content) => {
    //console.log('add', content)
    store.dispatch(addAnecdote(content))
    store.dispatch(showNotification("You added: " + content))
    setTimeout(() =>{
      store.dispatch(hideNotification())
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

export default AnecdoteForm