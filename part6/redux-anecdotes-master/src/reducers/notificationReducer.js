const initialState = null

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SHOW_NOTIFICATION':
            return action.data.notification
        case 'HIDE_NOTIFICATION':
            return null
        default: 
            return state
    }
}

export const setNotification = (notification, time ) => {
  return async dispatch =>{
    await dispatch({
      type: "SHOW_NOTIFICATION",
      data:{
        notification
      }
    })
    setTimeout(() =>{
    dispatch({
        type: "HIDE_NOTIFICATION"
      })
    }, time)
  }
}

export const showNotification = (notification) => {
    return {
      type: 'SHOW_NOTIFICATION',
      data:{
        notification
      }
    }
}
export const hideNotification = () => {
    return {
      type: 'HIDE_NOTIFICATION'
    }
  }

export default reducer