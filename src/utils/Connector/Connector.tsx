import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { bsc } from 'wagmi/chains'

export const chains = [bsc]
export const projectId = 'ee83a6abf3d3b38701872852fd11b985'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
})
