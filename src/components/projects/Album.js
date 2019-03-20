import React from 'react'
import wall from '../../static/wall.jpg'
import coffee from '../../static/coffee.jpg'
import unreal from '../../static/unreal.jpg'

export const Album = () => {
  const images = [wall, coffee, unreal]
  var x = 0
  const handleClick = () => {

  }

  return(
    <div className="carousel_wrapper section">
      <div className="card">
        {images.map((image, index) => {
          x++
          const style = x === 0 ? "display: block" : "display: none"
          return (
            <div
              className="carousel"
              onClick={handleClick}
              key={index}>
              <img
                src={image}
                alt="img"
                className="responsive-img"/>
            </div>
          )
        })}
      </div>
    </div>
  )
}
