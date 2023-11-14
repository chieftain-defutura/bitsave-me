import React, { useEffect, useRef, useState, useMemo } from 'react'
import './PlanBNB.scss'
import ChevronDown from '../../../assets/icons/chevron-down.svg'
import Button from 'components/Button/Button'
import autoAnimate from '@formkit/auto-animate'
import {
  erc20ABI,
  useAccount,
  useChainId,
  useContractRead,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers'
import BUSDCoin from '../../../assets/icons/usd-coin.svg'
import USDCoin from '../../../assets/icons/usdt.png'
import { useSearchParams } from 'react-router-dom'
import { useTransactionModal } from 'context/TransactionContext'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'

import { stakingABI } from 'utils/abi/stakingABI'

const MINIMUM_STAKE_AMOUNT = 20

const PlanBNB: React.FC = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const [searchParams] = useSearchParams()
  const referral_address = searchParams.get('ref')
  const { setTransaction } = useTransactionModal()
  const [selectedToken, setSelectedToken] = useState({
    tokenAddress: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS],
    isApproved: false,
    name: 'USDT',
    logo: USDCoin,
    balance: 0,
  })
  const [plan, setPlan] = useState('30')
  const [amount, setAmount] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [totalProfit, setTotalProfit] = useState(0)
  const [dailyProfit, setDailyProfit] = useState(0)

  const tokensLists = [
    {
      tokenAddress: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS],
      isApproved: false,
      name: 'USDT',
      logo: USDCoin,
      balance: 0,
    },
    {
      tokenAddress: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS],
      isApproved: false,
      name: 'BUSD',
      logo: BUSDCoin,
      balance: 0,
    },
  ]

  console.log('chainId', chainId)
  const { data: balanceData } = useContractReads({
    contracts: [
      {
        address: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address as any],
      },
      {
        address: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address as any],
      },
    ],
  })

  const { data: allowanceData, refetch } = useContractReads({
    contracts: [
      {
        address: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [
          address as any,
          STAKING_CONTRACT_ADDRESS[
            chainId as keyof typeof STAKING_CONTRACT_ADDRESS
          ] as any,
        ],
      },
      {
        address: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [
          address as any,
          STAKING_CONTRACT_ADDRESS[
            chainId as keyof typeof STAKING_CONTRACT_ADDRESS
          ] as any,
        ],
      },
    ],
  })

  const { data: referrerData } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'getReferrerAddress',
    args: [address as any],
  })

  const {
    write,
    isError: approveError,
    data: approveData,
  } = useContractWrite({
    address: selectedToken.tokenAddress as any,
    abi: erc20ABI,
    functionName: 'approve',
  })
  const { isSuccess: approveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
  })
  const {
    write: stake,
    isError: stakeError,
    data: stakeData,
  } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'stake',
  })
  const { isSuccess: stakeSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  const handleApproveToken = async () => {
    setTransaction({
      loading: true,
      status: 'pending',
    })

    write({
      args: [
        STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        ethers.utils.parseEther(amount).toBigInt(),
      ],
    })
  }

  const handleStake = async () => {
    try {
      let ref = referrerData ?? ''

      if (referral_address) {
        ref = referral_address
      }
      setTransaction({ loading: true, status: 'pending' })

      stake({
        args: [
          selectedToken.tokenAddress as any,
          ethers.utils.parseEther(amount).toBigInt(),
          plan as any,
          ref as any,
        ],
      })
    } catch (error: any) {
      console.log(error.reason)
      setTransaction({ loading: true, status: 'error', message: error.reason })
    }
  }

  useEffect(() => {
    if (approveError) {
      setTransaction({ loading: true, status: 'error' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveError])

  useEffect(() => {
    if (stakeError) {
      setTransaction({ loading: true, status: 'error' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeError])

  useEffect(() => {
    if (approveSuccess) {
      setTimeout(() => {
        setTransaction({ loading: true, status: 'success' })
        refetch()
        handleStake()
      }, 2000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveSuccess])

  useEffect(() => {
    if (stakeSuccess) {
      setTransaction({
        loading: true,
        status: 'success',
        message: 'staked successfully',
      })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeSuccess])

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(() => {
    const amt = Number(amount)
    if (amt <= 19999) {
      setDailyProfit(0.5)
      setTotalProfit(0.5 * Number(plan))
    }
    if (amt > 19999 && amt <= 50999) {
      setDailyProfit(1)
      setTotalProfit(1 * Number(plan))
    }
    if (amt > 51000) {
      setDailyProfit(1.5)
      setTotalProfit(1.5 * Number(plan))
    }
  }, [amount, setDailyProfit, setTotalProfit, plan])

  const selectedTokenBalance = useMemo(() => {
    if (
      selectedToken.tokenAddress ===
      USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS]
    ) {
      if (!balanceData) return 0

      if (balanceData[0].result) {
        return Number(ethers.utils.formatEther(balanceData[0].result))
      }
    } else {
      if (!balanceData) return 0

      if (balanceData[1].result) {
        return Number(ethers.utils.formatEther(balanceData[1].result))
      }
    }

    return 0
  }, [balanceData, selectedToken, chainId])

  const isApproved = useMemo(() => {
    if (
      selectedToken.tokenAddress ===
      USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS]
    ) {
      if (!allowanceData) return false

      if (allowanceData[0].result) {
        const allowance = Number(
          ethers.utils.formatEther(allowanceData[0].result),
        )

        if (allowance < Number(amount)) {
          return false
        }

        return true
      }
    } else {
      if (!allowanceData) return false

      if (allowanceData[1].result) {
        const allowance = Number(
          ethers.utils.formatEther(allowanceData[1].result),
        )

        if (allowance < Number(amount)) {
          return false
        }

        return true
      }
    }

    return false
  }, [chainId, allowanceData, selectedToken, amount])

  console.log(isApproved)

  return (
    <div className="plan-container">
      <div className="plan-head">
        <h5>Plan</h5>
        <div className="select-input">
          <select name="" id="" onChange={(e) => setPlan(e.target.value)}>
            <option value="30">30 days</option>
            <option value="60"> 60 days</option>
            <option value="90">90 days</option>
            <option value="120">120 days</option>
            <option value="180">180 days</option>
            <option value="360">360 days</option>
          </select>
        </div>

        <div className="profit">
          <div>
            <h3>Daily profit</h3>
            <h1>
              <span>{dailyProfit} %</span>
            </h1>
          </div>
          <div>
            <h3>Total profit</h3>
            <h1>
              <span>{totalProfit}%</span>
            </h1>
          </div>
        </div>

        <div className="balance-content">
          <div className="dropDown">
            <div
              className="select-dropDown"
              onClick={() => setDropdown((d) => !d)}
            >
              <img
                src={selectedToken.logo}
                alt=""
                style={{ borderRadius: '50%' }}
              />
              <p>{selectedToken.name}</p>

              <img src={ChevronDown} alt="" className="chevron-down" />
            </div>
            <div ref={parent}>
              {dropdown && (
                <div className="dropDown-list">
                  {tokensLists.map((f, index) => {
                    return (
                      <div
                        className="dropDown-items usdt-img"
                        key={index}
                        onClick={() => {
                          setSelectedToken(f)
                          setDropdown(false)
                        }}
                      >
                        <img src={f.logo} alt="" />
                        <p>{f.name}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="balance">
            <p>
              Balance:{' '}
              {new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              }).format(selectedTokenBalance)}
              &nbsp;{selectedToken.name}
            </p>
          </div>
        </div>

        <div className="max-container">
          <input
            type="text"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => setAmount(selectedToken.balance.toString())}>
            Max
          </button>
        </div>

        <div className="stake-btn">
          {!isApproved ? (
            // <Button
            //   varient="secondary"
            //   disabled={
            //     !Number(amount) || Number(amount) < MINIMUM_STAKE_AMOUNT
            //   }
            //   onClick={() => handleApproveToken()}
            // >
            //   {Number(amount) > selectedTokenBalance
            //     ? 'Insufficient Balance'
            //     : !Number(amount)
            //     ? 'Enter Amount'
            //     : Number(amount) < MINIMUM_STAKE_AMOUNT
            //     ? `Min 20 ${selectedToken.name}`
            //     : 'Approve'}
            // </Button>
            <Button
              varient="primary"
              onClick={() => {
                handleApproveToken()
              }}
              disabled={
                Number(amount) > selectedTokenBalance ||
                !Number(amount) ||
                Number(amount) < MINIMUM_STAKE_AMOUNT
              }
            >
              {Number(amount) > selectedTokenBalance
                ? 'Insufficient Balance'
                : !Number(amount)
                ? 'Enter Amount'
                : Number(amount) < MINIMUM_STAKE_AMOUNT
                ? `Min 20 ${selectedToken.name}`
                : 'Stake'}
            </Button>
          ) : (
            <Button
              varient="primary"
              onClick={() => {
                handleStake()
              }}
              disabled={
                Number(amount) > selectedTokenBalance ||
                !Number(amount) ||
                Number(amount) < MINIMUM_STAKE_AMOUNT
              }
            >
              {Number(amount) > selectedTokenBalance
                ? 'Insufficient Balance'
                : !Number(amount)
                ? 'Enter Amount'
                : Number(amount) < MINIMUM_STAKE_AMOUNT
                ? `Min 20 ${selectedToken.name}`
                : 'Stake'}
            </Button>
          )}
        </div>

        <div className="min-max">
          <p>
            Min:{' '}
            <span>
              {MINIMUM_STAKE_AMOUNT} {selectedToken.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanBNB
