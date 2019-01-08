import React from 'react'
import moment from 'moment'

const Notification = (props) => {
  console.log(props)
  const { notifications } = props
  return(
    <div className="section">
      <div className="notification-card card z-depth-0 show-up">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notifications">
            {notifications && notifications.map(item => {
              return(
                <li key={item.id}>
                  <span className="green-text">{item.user}</span>
                  <span>{" "+item.content}</span>
                  <div>
                    <span className="grey-text lighten-5">{moment(item.time.toDate()).fromNow()}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notification
