import stakingABI from './abi/stakingABI.json'

export const USDT_ADDRESS = {
  97: '0x313FFd15E0F47f5f06809f54f6e9A17E7a527302',
}

export const BUSD_ADDRESS = {
  97: '0xEe11333fA74225e55cCF66a15F45c1698Ea9E732',
}

export const STAKING_CONTRACT_ADDRESS = {
  97: '0x57bE5845D0226cE3DF93313e69A5e5b5FA9897EE',
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
