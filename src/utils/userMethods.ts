import { ethers } from 'ethers'
import { STAKE_CONTRACT_ADDRESS } from './contractAddress'
import tokenAbi from './abi/tokenABI.json'
import stakingAbi from './abi/stakingABI.json'
import { formatEther } from 'ethers/lib/utils.js'
import { Status } from 'constants/types'
import { tokensLists } from 'constants/tokenList'

const REACT_APP_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
const REACT_APP_RPC_URL = process.env.REACT_APP_RPC_URL

export const loadTokenContract = (
  signer: ethers.Signer,
  tokenAddress: string,
) => {
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer)

  return tokenContract
}

export const loadStakingContract = (address: string, signer: ethers.Signer) => {
  const stakingContract = new ethers.Contract(
    STAKE_CONTRACT_ADDRESS,
    stakingAbi,
    signer,
  )

  return stakingContract
}

export const getIsApproved = async (
  address: string,
  signer: ethers.Signer,
  tokenAddress: string,
) => {
  const tokenContract = loadTokenContract(signer, tokenAddress)

  return Number(
    (await tokenContract.allowance(address, STAKE_CONTRACT_ADDRESS)).toString(),
  )
}

export const getUserTokenBalance = async (
  address: string,
  signer: ethers.Signer,
  tokenAddress: string,
) => {
  const tokenContract = loadTokenContract(signer, tokenAddress)

  return Number(
    ethers.utils.formatEther(
      (await tokenContract.balanceOf(address)).toString(),
    ),
  )
}

export const stake = async (
  address: string,
  provider: ethers.Signer,
  planId: string,
  amount: string,
  token: string,
  referrer: string,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const tx = await stakingContract.stake(
    planId,
    ethers.utils.parseUnits(amount, '18'),
    token,
    referrer,
  )
  await tx.wait()
}

export const claim = async (
  address: string,
  provider: ethers.Signer,
  stakeIndex: number,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const tx = await stakingContract.claim(stakeIndex)
  await tx.wait()
}

export const withdraw = async (
  address: string,
  provider: ethers.Signer,
  stakeIndex: number,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const tx = await stakingContract.withdraw(stakeIndex)
  await tx.wait()
}

export const claimReferralBonus = async (
  address: string,
  provider: ethers.Signer,
  tokenAddress: string,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const tx = await stakingContract.claimReferralBonus(tokenAddress)
  await tx.wait()
}

export const calculateEarnings = async (
  address: string,
  provider: ethers.Signer,
  stakeIndex: number,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const earnings = await stakingContract.calculateEarnings(address, stakeIndex)

  return Number(ethers.utils.formatEther(earnings))
}

export const getUserContractData = async (
  address: string,
  provider: ethers.Signer,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const referrer = await stakingContract.getReferrerAddress(address)
  const userStakedData: any[] = await stakingContract.getUserStakes(address)

  const modifiedUserStakedData = await Promise.all(
    userStakedData.map(async (u: any, index: number) => {
      const earnings = await calculateEarnings(address, provider, index)

      return {
        stakeIndex: index,
        amount: Number(formatEther(u.amount.toString())),
        endTime: Number(u.endTime.toString()),
        lastClaimTimestamp: Number(u.lastClaimTimestamp.toString()),
        planId: String(u.planId.toString()),
        status: u.status.toString() === '0' ? Status.PENDING : Status.FINISHED,
        tokenAddress: String(u.tokenAddress),
        earnings,
      }
    }),
  )

  return {
    user: String(address),
    referrer: String(referrer),
    userStakedData: modifiedUserStakedData,
  }
}

export const getUserReferralData = async (
  address: string,
  provider: ethers.Signer,
  tokenList: typeof tokensLists,
) => {
  const stakingContract = loadStakingContract(address, provider)

  const referralList = await stakingContract.getUserReferralList(address)

  const referralRewards = await Promise.all(
    tokenList.map(async (token) => {
      const rewards = await stakingContract.getUserReferralRewards(
        address,
        token.tokenAddress,
      )

      return {
        rewards: Number(ethers.utils.formatEther(rewards).toString()),
        ...token,
      }
    }),
  )

  return {
    referralList,
    referralRewards,
  }
}

export const getStatsOfToken = async (tokenList: typeof tokensLists) => {
  if (!REACT_APP_PRIVATE_KEY) return

  const provider = new ethers.providers.JsonRpcProvider(REACT_APP_RPC_URL)
  const signer = new ethers.Wallet(REACT_APP_PRIVATE_KEY, provider)

  const stakingContract = new ethers.Contract(
    STAKE_CONTRACT_ADDRESS,
    stakingAbi,
    signer,
  )

  const stats = await Promise.all(
    tokenList.map(async (token) => {
      const data = await stakingContract.getStatsOfToken(token.tokenAddress)

      return {
        totalStaked: Number(ethers.utils.formatEther(data[0]).toString()),
        totalReferralRewards: Number(
          ethers.utils.formatEther(data[1]).toString(),
        ),
      }
    }),
  )

  console.log(stats)
  return stats
}
