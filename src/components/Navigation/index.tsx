import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'

import './Navigation.scss'
import Logo from '../../assets/images/footer-logo.png'

const Navigation: React.FC = () => {
  const [Active, setActive] = useState('true')
  return (
    <div className="mx">
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="nav">
          <Link to="/">
            <p
              onClick={() => setActive('stack')}
              style={{ color: Active === 'stack' ? 'orange' : '#fff' }}
              className="stack"
            >
              Stake
            </p>
          </Link>
          <Link to="/borrow">
            <p
              onClick={() => setActive('borrow')}
              style={{ color: Active === 'borrow' ? 'orange' : '#fff' }}
              className="borrow"
            >
              Borrow
            </p>
          </Link>
        </div>

        <Web3Button />
      </div>
    </div>
  )
}

export default Navigation
