import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'
import './Navigation.scss'

import Logo from '../../assets/logo/logo.jpg'
import Menu from '../../assets/icons/menu.svg'
import Close from '../../assets/icons/close.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useAccount, useChainId, useContractRead } from 'wagmi'
import { STAKING_CONTRACT_ADDRESS } from 'utils/address'
import { stakingABI } from 'utils/abi/stakingABI'

const Navigation: React.FC = () => {
  const [Active, setActive] = useState('true')
  const [openClose, setOpenClose] = useState(false)
  const { address } = useAccount()
  const chainId = useChainId()

  useEffect(() => {
    if (openClose) {
      document.body.style.overflowY = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflowY = 'initial'
      document.body.style.height = 'initial'
    }
  }, [openClose])

  const { data } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'getOwner',
  })

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
      {data && data.toLowerCase() === address?.toLowerCase() && (
        <Link to="/admin">
          <div onClick={() => setOpenClose(false)}>
            <p>Admin</p>
          </div>
        </Link>
      )}
    </div>
  )

  return (
    <div className="mx">
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </Link>
        {renderLinks}
        <Web3Button />
        <div className="menu">
          {!openClose ? (
            <img src={Menu} alt="" onClick={() => setOpenClose((m) => !m)} />
          ) : (
            <img
              src={Close}
              alt=""
              width="28px"
              onClick={() => setOpenClose((m) => !m)}
            />
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
