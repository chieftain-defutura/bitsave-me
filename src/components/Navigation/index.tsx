import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useConnect } from 'wagmi'
import { disconnect } from '@wagmi/core'
import './Navigation.scss'
import MetamaskLogo from '../../assets/logo/metamask-logo.png'
import WalletConnectLogo from '../../assets/logo/walletconnect-logo.png'
import Logo from '../../assets/images/footer-logo.png'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as BlueIcon } from '../../assets/icons/blue-round.svg'
import { ReactComponent as Disconnect } from '../../assets/icons/disconnect.svg'
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg'
import { ReactComponent as Check } from '../../assets/icons/check.svg'
import Button from 'components/Button/Button'

const Navigation: React.FC = () => {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const [connectedLogo, setConnectedLogo] = useState(MetamaskLogo)
  console.log(connectedLogo)
  // const navigate = useNavigate()
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState('')

  // your function to copy here

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      setCopySuccess('Copied!')
      setTimeout(() => {
        console.log('run')
        setCopySuccess('')
      }, 5000)
    } catch (err) {
      setCopySuccess('Failed to copy!')
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
  }

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
                      }}
                    >
                      {connector.name === 'MetaMask' && (
                        <div
                          className="modal-content"
                          onClick={() => setConnectedLogo(MetamaskLogo)}
                        >
                          <img src={MetamaskLogo} alt="" />
                          <p>{connector.name}</p>
                        </div>
                      )}
                      {connector.name === 'WalletConnect' && (
                        <div
                          className="modal-content"
                          onClick={() => setConnectedLogo(WalletConnectLogo)}
                        >
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
              <div className="connected-logo">
                <img
                  src={
                    connectedLogo === MetamaskLogo
                      ? MetamaskLogo
                      : WalletConnectLogo
                  }
                  alt=""
                />
              </div>
              <div
                className="connected-address"
                onClick={() => setModal((m) => !m)}
              >
                <BlueIcon />
                {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
                {!modal ? <ArrowDown /> : <ArrowUp />}
              </div>
              {modal && (
                <div className="connected-modal">
                  <div
                    className="copy-address"
                    onClick={(e) => e.preventDefault}
                  >
                    <BlueIcon />
                    {address?.slice(0, 6)}...
                    {address?.slice(address?.length - 6)}
                    {copySuccess ? (
                      <Check />
                    ) : (
                      <Copy onClick={() => copyToClipBoard(address)} />
                    )}
                  </div>

                  <div className="disconnect" onClick={handleDisconnect}>
                    <h3>Disconnect</h3>
                    <Disconnect />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
