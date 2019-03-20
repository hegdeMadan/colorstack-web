import React, { Component } from 'react'
import FollowersList from './FollowersList'
import FollowingList from './FollowingList'
import Summary from '../Summary'

class Followers extends Component {
  constructor() {
    super()
    this.state = {
      followState: ['Following', 'Followers'],
      selected: '',
      style: {
        borderBottom: '2px solid black'
      }
    }
  }

  handleClick = (item) => {
    this.setState(() => {
      return{
        selected: item
      }
    }, () => {
      console.log(this.state.selected)
    })
  }

  render() {
    const { following } = this.props
    const { followers } = this.props
    const selected = this.state.selected

    let tab
    if(selected === 'Following') {
      tab = <FollowingList following={following} />
    } else {
      tab = <FollowersList followers={followers} />
    }

    return(
      <div>
        <div className="col l4 m4 s12">
          <Summary />
        </div>
        <div className="col l6 offset-l1 m6 offset-m1 s12 follow_er_ing">
          {/* <FollowingList following={following} /> */}
          <div>
            <div className="switch_tab">
              {this.state.followState.map((item, index) => {
                return(
                  <span key={index}
                  onClick={() => {this.handleClick(item)}}>
                    {item}
                  </span>
                )
              })}
            </div>
            <div>
              {tab}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Followers
