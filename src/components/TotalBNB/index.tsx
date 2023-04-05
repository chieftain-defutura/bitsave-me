import React from 'react'
import { ITotalBNB } from './TotalBNB'
import './TotalBNB.scss'

const TotalBNB: React.FC = () => {
  return (
    <div className="total-bnb-wrapper">
      <div className="mx">
        <div className="total-bnb-container">
          {ITotalBNB.map((f, index) => {
            return (
              <div key={index} className="total-bnb-content">
                <p>{f.title}</p>
                <h1>
                  <span>{f.bnb}</span>
                </h1>
                <h6>{f.dollar}</h6>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TotalBNB
