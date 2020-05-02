import React, { Component } from 'react'

class Tabs extends Component {
  constructor() {
    super()
    this.state = {
      tabs: ['Artwork', 'Album', 'Collection', 'Bio']
    }
  }

  hancleClick = (tab) => {
    this.props.onClick(tab)
  }

  render() {
    return (
      <div className="tab_cover">
        <ul>
          { this.state.tabs.map((tab, index) => {
            return (
              <div
                key={index}
                className="tabname"
                onClick={() => this.hancleClick(tab)}>
                <li>
                  {tab}
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Tabs
