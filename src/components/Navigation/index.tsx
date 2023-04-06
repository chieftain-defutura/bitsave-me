import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useConnect } from 'wagmi'
import './Navigation.scss'
import MetamaskLogo from '../../assets/logo/metamask-logo.png'
import WalletConnectLogo from '../../assets/logo/walletconnect-logo.png'
import Logo from '../../assets/images/footer-logo.png'
import Button from 'components/Button/Button'

const Navigation: React.FC = () => {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const navigate = useNavigate()
  const { address } = useAccount()
  const [open, setOpen] = useState(false)

  return (
    <div className="mx">
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="header-container">
          {!address ? (
            <>
              <div className="connect-btn">
                <Button varient="primary" onClick={() => setOpen((m) => !m)}>
                  Connect Wallet
                </Button>
              </div>

              {open && (
                <div className="modal">
                  {connectors.map((connector) => (
                    <div
                      key={connector.id}
                      onClick={async () => {
                        await connectAsync({ connector })
                        navigate('/home')
                      }}
                    >
                      {connector.name === 'MetaMask' && (
                        <div className="modal-content">
                          <img src={MetamaskLogo} alt="" />
                          <p>{connector.name}</p>
                        </div>
                      )}
                      {connector.name === 'WalletConnect' && (
                        <div className="modal-content">
                          <img src={WalletConnectLogo} alt="" />
                          <p> {connector.name}</p>
                        </div>
                      )}
                      {!connector.ready && ' (unsupported)'}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </div>
                  ))}
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </div>
              )}
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
