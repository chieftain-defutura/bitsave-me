import stakingABI from './abi/stakingABI.json'

export const USDT_ADDRESS = {
  97: '0x313FFd15E0F47f5f06809f54f6e9A17E7a527302',
}

export const BUSD_ADDRESS = {
  97: '0xEe11333fA74225e55cCF66a15F45c1698Ea9E732',
}

export const STAKING_CONTRACT_ADDRESS = {
  97: '0x50029bE4c6120D660cFC743D2F21a54794C16870',
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
