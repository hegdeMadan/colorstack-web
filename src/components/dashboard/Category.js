import React, { Component } from 'react'

class Category extends Component {
  constructor() {
    super()
    this.state={
      types: ['Albums']
    }
  }

  render() {
    return(
      <div className="section">
        <div className="category_cover">
          <ul>
            {this.state.types.map((item, index) => {
              return(
                <div
                  key={index}
                  className="category">
                  <li>
                    <i className="material-icons">
                      collections
                    </i>
                    <span>
                      {item}
                    </span>
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Category
