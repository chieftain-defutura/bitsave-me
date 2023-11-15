import React, { useEffect } from 'react'
import './Deposit.scss'
import Button from 'components/Button/Button'
import {
  erc20ABI,
  useAccount,
  useChainId,
  useContractRead,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import ReactCountdown from 'react-countdown'
import dayjs from 'dayjs'

import { useTransactionModal } from 'context/TransactionContext'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'
import { stakingABI } from 'utils/abi/stakingABI'
import { ethers } from 'ethers'

interface IStakedData {
  data?:
    | {
        balance: bigint
        firstStakedTime: bigint
        lastStakedTime: bigint
        lastWithdrawTime: bigint
        stakePeriod: bigint
        stakeEndTime: bigint
        plan: bigint
        token: `0x${string}`
        reward: bigint
      }
    | undefined
}

const DepositData: React.FC<IStakedData & { index: number }> = ({
  data,
  index,
}) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { setTransaction } = useTransactionModal()

  const { data: symbol } = useContractRead({
    address: data?.token as any,
    abi: erc20ABI,
    functionName: 'symbol',
  })
  const { data: pendingRewards } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'calculateReward',
    args: [address as any, data?.token as any],
  })

  const {
    data: claimRewardData,
    isError: claimError,
    write: writeClaimReward,
  } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'claimRewards',
    args: [data?.token as any],
  })
  const { isSuccess: claimSuccess } = useWaitForTransaction({
    hash: claimRewardData?.hash,
  })

  const {
    data: withdrawData,
    isError: withdrawError,
    write: writeWithdraw,
  } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'withdraw',
    args: [data?.token as any],
  })
  const { isSuccess: withdrawSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  })

  useEffect(() => {
    if (claimSuccess || withdrawSuccess) {
      setTransaction({ loading: true, status: 'success' })

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    if (claimError || withdrawError) {
      setTransaction({ loading: true, status: 'error' })
    }
  }, [claimError, claimSuccess, withdrawError, withdrawSuccess, setTransaction])

  const handleClaim = async () => {
    setTransaction({ loading: true, status: 'pending' })
    writeClaimReward({ args: [data?.token as any] })
  }

  const handleWithdraw = async () => {
    setTransaction({ loading: true, status: 'pending' })
    writeWithdraw({ args: [data?.token as any] })
  }

  if (!data || !data['balance']) return null

  const lastWithdrawTime = Number(data?.lastWithdrawTime.toString()) * 1000
  const stakeEndTime = Number(data.stakeEndTime.toString()) * 1000
  const rewards = Number(ethers.utils.formatEther(data?.reward) ?? '0')
  const availableRewards = dayjs(
    Number(data?.firstStakedTime.toString()) * 1000,
  )
    .add(30, 'minutes')
    .toDate()
  console.log(availableRewards)
  return (
    <div className="details">
      <div className="flex-container">
        <div className="num">
          <p>{index + 1}. </p>
        </div>
        <div className="content">
          <div className="flex-content">
            <h2>
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 4,
              }).format(Number(ethers.utils.formatEther(data.balance)))}
              &nbsp;
              {symbol}
            </h2>
          </div>
          <p>
            plan: <span>{data.stakePeriod.toString()} Days</span>
          </p>
          <p>
            <span>Profit</span>:{' '}
            {stakeEndTime < lastWithdrawTime
              ? 0
              : new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                }).format(
                  Number(
                    ethers.utils.formatEther(pendingRewards?.toString() ?? '0'),
                  ) + rewards,
                )}
          </p>
        </div>
      </div>
      <div className="buttons">
        <ReactCountdown
          date={dayjs(Number(data?.firstStakedTime.toString()) * 1000)
            .add(30, 'minute')
            .toDate()}
          renderer={({ completed, days, minutes, seconds, hours }) => {
            if (!completed) {
              return (
                <>
                  <span>Rewards available from </span>
                  <p>
                    <b>
                      {days}d : {hours}h : {minutes}m : {seconds}s
                    </b>
                  </p>
                </>
              )
            } else {
              return (
                <>
                  <div className="withdrawal-btn">
                    <Button
                      varient="secondary"
                      disabled={
                        Number(data.stakeEndTime.toString()) * 1000 >
                        new Date().getTime()
                      }
                      onClick={handleWithdraw}
                    >
                      Withdrawal
                    </Button>
                  </div>
                  {Number(data.stakeEndTime.toString()) * 1000 <
                    new Date().getTime() && (
                    <Button varient="waring" onClick={handleClaim}>
                      Claim
                    </Button>
                  )}
                </>
              )
            }
          }}
        />
      </div>
    </div>
  )
}

const Deposit: React.FC = () => {
  const { address } = useAccount()
  const chainId = useChainId()

  const tokensLists = [
    {
      tokenAddress: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS],
      isApproved: false,
      name: 'USDT',
      // logo: USDCoin,
      balance: 0,
    },
    {
      tokenAddress: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS],
      isApproved: false,
      name: 'BUSD',
      // logo: BUSDCoin,
      balance: 0,
    },
  ]

  const { data: userStakeData } = useContractReads({
    contracts: [
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'getUserStakes',
        args: [address as any, tokensLists[0].tokenAddress as any],
      },
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'getUserStakes',
        args: [address as any, tokensLists[1].tokenAddress as any],
      },
    ],
  })

  console.log(userStakeData)

  return (
    <div className="card-2">
      <div className="deposit-container">
        <h1>your deposits</h1>
        <div className="deposit">
          {userStakeData
            ?.filter((f) => f.status === 'success')
            .filter((f) => f.result && f.result.balance.toString() !== '0')
            .map((data, index) => (
              <DepositData key={index} index={index} data={data.result} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Deposit
