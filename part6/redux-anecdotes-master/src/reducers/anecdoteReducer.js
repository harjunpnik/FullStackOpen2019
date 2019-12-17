const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
  return {
    type: 'VOTE',
    data:{
      id: id
    }
  }
}
export const addAnecdote = (data) => {
  return {
    type: "ADD",
    data: data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}


export default reducer