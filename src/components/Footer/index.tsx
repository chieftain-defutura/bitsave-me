import React from 'react'
import FooterLogo from '../../assets/images/footer-logo.png'
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg'
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'
import { ReactComponent as Linkedin } from '../../assets/icons/linkedin.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'

import './Footer.scss'

const Footer: React.FC = () => {
  return (
    <div className="footer-wrapper">
      <div className="mx">
        <div className="stake-house-logo">
          <img src={FooterLogo} alt="" />
        </div>
        <div className="footer-nav-item">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions </a>
          <a href="/">Disclaimer</a>
        </div>
        <div className="media-icons">
          <a href="/">
            <Twitter />
          </a>
          <a href="/">
            <Instagram />
          </a>
          <a href="/">
            <Linkedin />
          </a>
          <a href="/">
            <Facebook />
          </a>
        </div>
        <div className="footer-end">
          <p>
            <span>2023 BNB FINANCE MINER, </span>
            All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
