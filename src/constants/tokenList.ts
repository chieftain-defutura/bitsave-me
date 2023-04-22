import { BUSD_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS } from 'utils/contractAddress'
import BUSDCoin from '../assets/icons/usd-coin.svg'
import USDCoin from '../assets/icons/usdt.png'
export const tokensLists = [
  {
    tokenAddress: USDT_TOKEN_ADDRESS,
    isApproved: false,
    name: 'USDT',
    logo: USDCoin,
    balance: 0,
  },
  {
    tokenAddress: BUSD_TOKEN_ADDRESS,
    isApproved: false,
    name: 'BUSD',
    logo: BUSDCoin,
    balance: 0,
  },
]
