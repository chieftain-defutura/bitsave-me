import { ethers } from 'ethers'
import { STAKE_CONTRACT_ADDRESS } from './contractAddress'
import tokenAbi from './abi/tokenABI.json'
import stakingAbi from './abi/stakingABI.json'
import { formatEther } from 'ethers/lib/utils.js'
import { Status } from 'constants/types'

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

  console.log(earnings)
}

export const getUserContractData = async (
  address: string,
  provider: ethers.Signer,
) => {
  console.log(address)
  const stakingContract = loadStakingContract(address, provider)

  const referrer = await stakingContract.getReferrerAddress(address)
  const userStakedData: any[] = await stakingContract.getUserStakes(address)

  const modifiedUserStakedData = userStakedData.map((u: any, index: number) => {
    return {
      stakeIndex: index,
      amount: Number(formatEther(u.amount.toString())),
      endTime: Number(u.endTime.toString()),
      lastClaimTimestamp: Number(u.lastClaimTimestamp.toString()),
      planId: String(u.planId.toString()),
      status: u.status.toString() === '0' ? Status.PENDING : Status.FINISHED,
      tokenAddress: String(u.tokenAddress),
    }
  })

  return {
    user: String(address),
    referrer: String(referrer),
    userStakedData: modifiedUserStakedData,
  }
}
