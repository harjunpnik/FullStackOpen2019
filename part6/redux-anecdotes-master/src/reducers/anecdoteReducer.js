import anecdoteService from "../services/anecdoteService"

const sortAnecdotes = (anecdotes) => {
  let sorted  = anecdotes.sort((a,b) => {
    return b.votes - a.votes})
  return sorted
}

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)      
      anecdoteToChange.votes++
      let sortedState = sortAnecdotes(state.map(n => n.id !== id ? n : anecdoteToChange))
      return sortedState
    case 'ADD':
      let nextState = [...state]
      nextState.push(action.data)
      return nextState
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }

}


export const incrementVote = (id) => {
  //console.log(id)
  return async dispatch =>{
    let targetAnecdote = await anecdoteService.getAll()
    targetAnecdote = targetAnecdote.find(n => n.id === id)
    //console.log("target", targetAnecdote)
    await anecdoteService.update(id, {...targetAnecdote, votes: targetAnecdote.votes+ 1 })
    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}

export const addAnecdote = (data) => {
  return async dispatch =>{
    const newAnecdotes = await anecdoteService.create(data)
    dispatch({
      type: "ADD",
      data: newAnecdotes
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}


export default reducer