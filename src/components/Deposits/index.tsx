import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import ReferralDepositsImg from '../../assets/images/referral-deposits-img.png'
import Usdt from '../../assets/icons/usd-coin.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import USDT from '../../assets/icons/usdt.png'
import autoAnimate from '@formkit/auto-animate'
import './Deposits.scss'

const Deposits: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <div className="deposits-wrapper">
      <div className="mx">
        <div className="deposits-container">
          <div className="deposits-first">
            <h4>
              Earn <span>1%</span> from each level 1 referral deposits.
            </h4>

            <div className="deposits-media">
              <img src={ReferralDepositsImg} alt="" />
            </div>

            <div className="box-content">
              <div className="box-flex-content">
                <input
                  type="search"
                  placeholder="You will get your ref link after investing"
                />
                <div className="copy-btn">
                  <Button varient="primary">Copy</Button>
                </div>
              </div>

              <div className="total-referrals">
                <h5>Total REFERRALS</h5>
                <h1>0</h1>
              </div>

              <div className="dropDown">
                <div
                  className="select-dropDown"
                  onClick={() => setDropDownOpen(!dropDownOpen)}
                >
                  <img src={Usdt} alt="" />
                  <p>USD</p>
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

              <div className="referral-content">
                <div>
                  <h5>Total REFERRAL EARNED</h5>
                  <h1>0.000</h1>
                </div>

                <div className="Claim-btn">
                  <Button varient="secondary">Claim</Button>
                </div>
              </div>
              <div className="Claim-btn-media">
                <Button varient="secondary">Claim</Button>
              </div>
            </div>
            <div className="deposit-para">
              <span>Deposit Atleast Once To Activate Referral Rewards.</span>
            </div>
          </div>
          <div className="deposits-second">
            <img src={ReferralDepositsImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposits
