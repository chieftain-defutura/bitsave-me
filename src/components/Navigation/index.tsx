import React from 'react'
import { Link } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'

import './Navigation.scss'
import Logo from '../../assets/images/footer-logo.png'

const Navigation: React.FC = () => {
  return (
    <div className="mx">
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <Web3Button />
      </div>
    </div>
  )
}

export default Navigation
