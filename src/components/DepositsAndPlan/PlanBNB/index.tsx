import React, { useEffect, useRef, useState, useCallback } from 'react'
import './PlanBNB.scss'
import ChevronDown from '../../../assets/icons/chevron-down.svg'
import Button from 'components/Button/Button'
import autoAnimate from '@formkit/auto-animate'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import TokenAbi from '../../../utils/abi/tokenABI.json'
import BUSDCoin from '../../../assets/icons/usd-coin.svg'
import USDCoin from '../../../assets/icons/usdt.png'
import { useSearchParams } from 'react-router-dom'
import { useTransactionModal } from 'context/TransactionContext'
import {
  BUSD_TOKEN_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from 'utils/contractAddress'
import {
  getIsApproved,
  getUserContractData,
  getUserTokenBalance,
  stake,
} from 'utils/userMethods'
import { userStore } from 'store/userStore'

const tokensLists = [
  {
    tokenAddress: BUSD_TOKEN_ADDRESS,
    isApproved: false,
    name: 'BUSD',
    logo: BUSDCoin,
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

const PlanBNB: React.FC = () => {
  const { address } = useAccount()
  const referrer = userStore((state) => state.referrer)
  const updateStatus = userStore((state) => state.updateStatus)
  const updateUserData = userStore((state) => state.updateUserData)
  const [searchParams] = useSearchParams()
  const referral_address = searchParams.get('ref')
  const { data: signerData } = useSigner()
  const { setTransaction } = useTransactionModal()
  const [tokens, setTokens] = useState<typeof tokensLists>([])
  const [selectedToken, setSelectedToken] = useState(tokensLists[0])
  const [plan, setPlan] = useState('1')
  const [amount, setAmount] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [totalProfit, setTotalProfit] = useState(0)
  const [dailyProfit, setDailyProfit] = useState(0)
  const handleGetData = useCallback(async () => {
    if (address && signerData) {
      try {
        updateStatus(true)
        updateUserData(await getUserContractData(address, signerData))
        const modifiedTokens = await Promise.all(
          tokensLists.map(async (token) => {
            const allowance = await getIsApproved(
              address,
              signerData,
              token.tokenAddress,
            )
            const balance = await getUserTokenBalance(
              address,
              signerData,
              token.tokenAddress,
            )
            return {
              ...token,
              isApproved: allowance > 0,
              balance,
            }
          }),
        )
        setTokens(modifiedTokens)
        setSelectedToken(modifiedTokens[0])
      } catch (error: any) {
        console.log(error)
      } finally {
        updateStatus(false)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, signerData])

  const handleSetDefaultData = useCallback(() => {
    setSelectedToken(tokensLists[0])
  }, [])

  useEffect(() => {
    handleGetData()
    handleSetDefaultData()
  }, [handleGetData, handleSetDefaultData])

  const handleApproveToken = async () => {
    try {
      if (!signerData || !address) return

      setTransaction({
        loading: true,
        status: 'pending',
      })
      const tokenContract = new ethers.Contract(
        selectedToken.tokenAddress,
        TokenAbi,
        signerData,
      )
      const tx = await tokenContract.approve(
        STAKE_CONTRACT_ADDRESS,
        ethers.constants.MaxUint256,
      )
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
      })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handlStake = async () => {
    try {
      if (!signerData || !address) return

      let ref = referrer

      if (referral_address) {
        ref = referral_address
      }
      setTransaction({ loading: true, status: 'pending' })

      await stake(
        address,
        signerData,
        plan,
        amount,
        selectedToken.tokenAddress,
        ref,
      )
      setTransaction({ loading: true, status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error: any) {
      console.log(error.reason)
      setTransaction({ loading: true, status: 'error', message: error.reason })
    }
  }
  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(() => {
    const amt = Number(amount)
    if (amt <= 1000) {
      setDailyProfit(0.5)
    }
    if (amt > 1000 && amt <= 10000) {
      setDailyProfit(1)
    }
    if (amt > 10000 && amt <= 50000) {
      setDailyProfit(2)
    }
    if (amt > 50000) {
      setDailyProfit(3)
    }
  }, [amount, setDailyProfit])
  useEffect(() => {
    if (plan === '1') {
      setTotalProfit(dailyProfit * 30)
    }
    if (plan === '2') {
      setTotalProfit(dailyProfit * 60)
    }
    if (plan === '3') {
      setTotalProfit(dailyProfit * 90)
    }
    if (plan === '4') {
      setTotalProfit(dailyProfit * 120)
    }
  }, [dailyProfit, plan])
  return (
    <div className="plan-container">
      <div className="plan-head">
        <h5>Plan</h5>
        <div className="select-input">
          <select name="" id="" onChange={(e) => setPlan(e.target.value)}>
            <option value="1">30days</option>
            <option value="2"> 60days</option>
            <option value="3">90days</option>
            <option value="4">120days</option>
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
                  {tokens.map((f, index) => {
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
              }).format(selectedToken.balance)}
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
          {!selectedToken.isApproved ? (
            <Button varient="secondary" onClick={() => handleApproveToken()}>
              Approve
            </Button>
          ) : (
            <Button
              varient="primary"
              onClick={() => {
                handlStake()
              }}
              disabled={
                Number(amount) > selectedToken.balance || !Number(amount)
              }
            >
              {Number(amount) > selectedToken.balance
                ? 'Insufficient Balance'
                : !Number(amount)
                ? 'Enter Amount'
                : 'Stake '}
            </Button>
          )}
        </div>

        <div className="min-max">
          <p>
            Min: <span>0.01</span>, Max: <span>100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanBNB
