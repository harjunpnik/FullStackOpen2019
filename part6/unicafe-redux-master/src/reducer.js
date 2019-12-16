const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    let stateToChange = {...state}
    switch (action.type) {
      case 'GOOD':
        stateToChange.good++
        return stateToChange
      case 'OK':
        stateToChange.ok++
        return stateToChange
      case 'BAD':
        stateToChange.bad++
        return stateToChange
      case 'ZERO':
        stateToChange.good = 0
        stateToChange.ok = 0
        stateToChange.bad = 0
        return stateToChange
      default:
        return state
    }
    
  }
  
  export default counterReducer