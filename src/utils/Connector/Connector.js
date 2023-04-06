import { createClient, defaultChains, configureChains } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { bscTestnet } from 'wagmi/chains'
const { chains, provider, webSocketProvider } = configureChains(
  [bscTestnet],
  [publicProvider()],
)

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),

    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
