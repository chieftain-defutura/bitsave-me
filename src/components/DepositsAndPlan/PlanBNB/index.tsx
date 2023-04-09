import React, { useEffect, useRef, useState } from 'react'
import './PlanBNB.scss'
import USDT from '../../../assets/icons/usdt.png'
import Usdt from '../../../assets/icons/usd-coin.svg'
import ChevronDown from '../../../assets/icons/chevron-down.svg'
import Button from 'components/Button/Button'
import autoAnimate from '@formkit/auto-animate'

const PlanBNB: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <div className="plan-container">
      <div className="plan-head">
        <h5>Plan</h5>
        <div className="select-input">
          <select name="" id="">
            <option value="1">30days</option>
            <option value="2"> 60days</option>
            <option value="3">90days</option>
            <option value="4">120days</option>
          </select>
        </div>

        <div className="profit">
          <div>
            <h3>Daily profit</h3>
            <h1>
              <span>9%</span>
            </h1>
          </div>
          <div>
            <h3>Total profit</h3>
            <h1>
              <span>270%</span>
            </h1>
          </div>
        </div>

        <div className="balance-content">
          <div className="dropDown">
            <div
              className="select-dropDown"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <img src={Usdt} alt="" />
              <p>BUSD</p>
              <img src={ChevronDown} alt="" className="chevronDown" />
            </div>
            <div ref={parent}>
              {dropDownOpen && (
                <div className="dropDown-list">
                  <div className="dropDown-items">
                    <img src={Usdt} alt="" />
                    <p>BUSD</p>
                  </div>
                  <div className="dropDown-items usdt-img">
                    <img src={USDT} alt="" />
                    <p>USD</p>
                  </div>
                  <div className="dropDown-items">
                    <img src={Usdt} alt="" />
                    <p>BUSD</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="balance">
            <p>Balance:</p>
            <h6> 0.00000</h6>
          </div>
        </div>

        <div className="max-container">
          <input type="text" placeholder="0" />
          <button>Max</button>
        </div>

        <div className="stake-btn">
          <Button varient="primary">Stake</Button>
        </div>

        <div className="min-max">
          <p>
            Min: <span>0.01</span>, Max: <span>100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanBNB
