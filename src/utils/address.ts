import stakingABI from './abi/stakingABI.json'

export const USDT_ADDRESS = {
  56: '0x55d398326f99059ff775485246999027b3197955',
  97: '0x313FFd15E0F47f5f06809f54f6e9A17E7a527302',
}

export const BUSD_ADDRESS = {
  56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  97: '0xEe11333fA74225e55cCF66a15F45c1698Ea9E732',
}

export const STAKING_CONTRACT_ADDRESS = {
  56: '0xCf77Ac988681334E9BFC4BFF3Bb50C52Dec40460',
  97: '0xB555F0E4cc2e9db2f994a0DE9Aa884F75749322c',
}

export const stakingContractConfig = (chainId: number) => {
  return {
    address:
      STAKING_CONTRACT_ADDRESS[
        chainId as keyof typeof STAKING_CONTRACT_ADDRESS
      ],
    abi: stakingABI,
  }
}
