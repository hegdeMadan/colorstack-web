import React from 'react'
import moment from 'moment'

const NotificationList = ({notifications}) => {
    return (
        <div>
            {notifications && notifications.map(item => {
            return(
              <li key={item && item.id}>
                <span className="green-text">{item && item.user}</span>
                <span>{" "+item.content}</span>
                <div>
                  <span className="grey-text lighten-5">
                    {moment(item.time.toDate()).fromNow()}
                  </span>
                </div>
              </li>
            )
          })}
        </div>
    )
}

export default NotificationList