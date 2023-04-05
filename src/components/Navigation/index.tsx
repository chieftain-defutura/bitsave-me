import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'

import { Connector } from '../Connect'
import Modal from '../Model'
import './Navigation.css'
import useDebounce from 'hooks/useDebounce'
import Button from 'components/Button'

import { ReactComponent as Logo } from '../../assets/logo/stake-logo.svg'

const Navigation: React.FC = () => {
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebounce(searchInput, 1000)

  return (
    <div className="navigation-container">
      <div className="container">
        <div className="container-left">
          <div className="logo-container">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="container-right">
          {!address ? (
            <>
              <Button variant="primary" onClick={() => setOpen(true)}>
                Login
              </Button>
              <Modal isOpen={open} handleClose={() => setOpen(false)}>
                <Connector />
              </Modal>
            </>
          ) : (
            <div className="address">
              {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
