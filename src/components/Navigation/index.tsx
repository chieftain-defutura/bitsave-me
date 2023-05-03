import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'
import './Navigation.scss'
import Logo from '../../assets/images/footer-logo.png'
import Menu from '../../assets/icons/menu.svg'
import Close from '../../assets/icons/close.svg'
import { AnimatePresence, motion } from 'framer-motion'

const Navigation: React.FC = () => {
  const [Active, setActive] = useState('true')
  const [openClose, setOpenClose] = useState(false)

  useEffect(() => {
    if (openClose) {
      document.body.style.overflowY = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflowY = 'initial'
      document.body.style.height = 'initial'
    }
  }, [openClose])

  const renderLinks = (
    <div className="nav">
      <Link to="/">
        <div onClick={() => setOpenClose(false)}>
          <p
            onClick={() => setActive('stack')}
            style={{ color: Active === 'stack' ? 'orange' : '#fff' }}
            className="stack"
          >
            Stake
          </p>
        </div>
      </Link>
      <Link to="/borrow">
        <div onClick={() => setOpenClose(false)}>
          <p
            onClick={() => setActive('borrow')}
            style={{ color: Active === 'borrow' ? 'orange' : '#fff' }}
            className="borrow"
          >
            Borrow
          </p>
        </div>
      </Link>
      <Link to="/buy">
        <div onClick={() => setOpenClose(false)}>
          <p
            onClick={() => setActive('buy')}
            style={{ color: Active === 'buy' ? 'orange' : '#fff' }}
            className="buy"
          >
            Buy
          </p>
        </div>
      </Link>
      <Link to="/sell">
        <div onClick={() => setOpenClose(false)}>
          <p
            onClick={() => setActive('sell')}
            style={{ color: Active === 'sell' ? 'orange' : '#fff' }}
            className="sell"
          >
            Sell
          </p>
        </div>
      </Link>
    </div>
  )

  return (
    <div className="mx">
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        {renderLinks}
        <Web3Button />
        <div className="menu">
          {!openClose ? (
            <img src={Menu} alt="" onClick={() => setOpenClose((m) => !m)} />
          ) : (
            <img src={Close} alt="" onClick={() => setOpenClose((m) => !m)} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {openClose && (
          <motion.div
            className="sidebar_backdrop"
            onClick={() => setOpenClose(false)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              className="bar"
              onClick={(e) => e.stopPropagation()}
              animate={{ right: 0, transitionDelay: '-200ms' }}
              exit={{ right: -300 }}
              initial={{ right: -300 }}
            >
              {renderLinks}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navigation
