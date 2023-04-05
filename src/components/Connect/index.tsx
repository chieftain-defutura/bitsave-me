import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useConnect } from 'wagmi'
import MetamaskLogo from '../../assets/logo/metamask-logo.png'
import Button from '../Button'
import './Connect.css'
import { connect } from 'http2'

export function Connector() {
  const { connectAsync, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const navigate = useNavigate()

  return (
    <div className="connector">
      {connectors.map((connector) => (
        <Button
          variant="primary"
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
