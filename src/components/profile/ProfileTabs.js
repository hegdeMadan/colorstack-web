import React, { Component } from 'react'
import Tabs from './Tabs'

class ProfileTabs extends Component {
  constructor() {
    super()
    this.state = {
      tabs: ['Bio', 'Followers', 'Art Works', 'Collections' ]
    }
  }

    getTab = (item) => {
      this.props.onClick(item)
    }

  render() {
    return(
      <div className="tabs-wrapper">
          {
            this.state.tabs.map((item, index) => {
              return(
                <div key={index}>
                  <Tabs item={item} onClick={this.getTab} />
                </div>
              )
            })
          }
      </div>
    )
  }
}

export default ProfileTabs
