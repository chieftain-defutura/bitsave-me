import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useConnect } from 'wagmi'
import MetamaskLogo from '../../assets/logo/metamask-logo.png'
import './Connect.css'
import Button from 'components/Button/Button'

export function Connector() {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const navigate = useNavigate()

  return (
    <div className="connector">
      {connectors.map((connector) => (
        <Button
          varient="primary"
          disabled={!connector.ready}
          key={connector.id}
          onClick={async () => {
            await connectAsync({ connector })
            navigate('/home')
          }}
        >
          {connector.name === 'MetaMask' && (
            <>
              <img src={MetamaskLogo} alt="" /> {connector.name}
            </>
          )}
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  )
}
