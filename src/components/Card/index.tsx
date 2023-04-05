import React from 'react'
import { ICard } from './Card'
import './Card.scss'

const Card: React.FC = () => {
  return (
    <div className="card-wrapper">
      <div className="mx">
        <div className="card-container">
          {ICard.map((f, index) => {
            return (
              <div key={index} className="card-content">
                <h5>{f.title}</h5>
                <img src={f.image} alt="" />
                <p>{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
