import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOutAction } from '../../store/actions/AuthActions'

const DropDown = (props) => {
  const { id } = props

  const handleClick = () => {
      props.onClick()
  }

  return(
  <div>
    <div className="drop_down">
      <ul>
        <NavLink to={'/profile/'+ id} className="black-text">
          <li>
            <i className="material-icons"> person </i>
            <span>
              Profile
            </span>
          </li>
        </NavLink>
        <li onClick={handleClick}>
          <i className="material-icons"> flash_on </i>
          <span>
            Notification
          </span>
        </li>
        <NavLink
          to='/'
          className="black-text"
          onClick={props.signOut}>
          <li>
            <i className="material-icons"> navigate_before </i>
            <span>
              logout
            </span>
          </li>
        </NavLink>
      </ul>
    </div>
  </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction())
  }
}

export default connect(null, mapDispatchToProps)(DropDown)
