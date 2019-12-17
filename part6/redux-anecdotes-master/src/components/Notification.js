import React from 'react'

const Notification = (props) => {
  const { notification } = props.store.getState()
  
  let style = {
    display: 'none'
  }

  if (notification !== null){
     style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }
  return (
    <div style={style}>
       {notification}
    </div>
  )
}

export default Notification