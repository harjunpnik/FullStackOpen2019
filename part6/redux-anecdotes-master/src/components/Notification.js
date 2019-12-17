import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const { notification } = props.store.getState()
  
  let style = {
    display: 'none'
  }

  if (props.notification !== null){
     style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }
  return (
    <div style={style}>
       {props.notification}
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
const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications