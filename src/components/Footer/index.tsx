import React from 'react'
import FooterLogo from '../../assets/logo/logo.jpg'
import { ReactComponent as Telegram } from '../../assets/icons/Telegram.svg'
// import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'
// import { ReactComponent as Linkedin } from '../../assets/icons/linkedin.svg'
// import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'

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
          <a
            href="https://t.me/+Z3AoAkvo6X81ZjA0"
            target="_blank"
            rel="noreferrer"
          >
            <Telegram />
          </a>
          {/* <a href="/">
            <Instagram />
          </a>
          <a href="/">
            <Linkedin />
          </a>
          <a href="/">
            <Facebook />
          </a> */}
        </div>
        <div className="footer-end">
          <p>
            Copyright © 2022 <span>Bit</span>aid ® All right reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
