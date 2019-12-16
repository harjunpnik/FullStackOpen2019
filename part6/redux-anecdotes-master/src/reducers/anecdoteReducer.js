const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

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

export const addAnecdote = (content) => {
  return {
    type: "ADD",
    data: asObject(content)
  }
}

export default reducer