import { BUSD_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS } from 'utils/contractAddress'
import USDCoin from '../assets/icons/usd-coin.svg'

export const tokensLists = [
  {
    tokenAddress: BUSD_TOKEN_ADDRESS,
    isApproved: false,
    name: 'BUSD',
    logo: USDCoin,
    balance: 0,
  },
  {
    tokenAddress: USDT_TOKEN_ADDRESS,
    isApproved: false,
    name: 'USDT',
    logo: USDCoin,
    balance: 0,
  },
]
