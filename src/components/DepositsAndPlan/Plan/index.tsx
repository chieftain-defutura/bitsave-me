import React, { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Button from '../../Button/Button'
import { useAccount, useSigner } from 'wagmi'
import TokenAbi from '../../../utils/abi/tokenABI.json'
import USDCoin from '../../../assets/icons/usd-coin.svg'
import ChevronDown from '../../../assets/icons/chevron-down.svg'

import { useTransactionModal } from 'context/TransactionContext'
import './Plan.scss'
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

const Plan: React.FC = () => {
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const { setTransaction, loading } = useTransactionModal()
  const [tokens, setTokens] = useState<typeof tokensLists>([])
  const [selectedToken, setSelectedToken] = useState(tokensLists[0])
  const [plan, setPlan] = useState('1')
  const [amount, setAmount] = useState('0')
  const [dropdown, setDropdown] = useState(false)
  const referrer = userStore((state) => state.referrer)
  const updateStatus = userStore((state) => state.updateStatus)
  const updateUserData = userStore((state) => state.updateUserData)

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

      await stake(
        address,
        signerData,
        plan,
        amount,
        selectedToken.tokenAddress,
        referrer,
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

  return (
    <div className="plan-container">
      <div className="plan-dropdown">
        <h3>PLAN</h3>

        <div className="select-input">
          <select name="" id="" onChange={(e) => setPlan(e.target.value)}>
            <option value="1">30days</option>
            <option value="2"> 60days</option>
            <option value="3">90days</option>
            <option value="4">120days</option>
          </select>
        </div>
      </div>
      <div className="profit">
        <div className="profit-content">
          <h3>daily profit</h3>
          <h1>
            <span>9%</span>
          </h1>
        </div>
        <div className="profit-content">
          <h3>Total profit</h3>
          <h1>
            <span>170%</span>
          </h1>
        </div>
      </div>
      <div className="balance-container">
        <div className="dropdown-container">
          <div className="drop-down" onClick={() => setDropdown((d) => !d)}>
            <img src={selectedToken.logo} alt="" />
            <p>{selectedToken.name}</p>

            <img src={ChevronDown} alt="" className="chevron-down" />
          </div>
          <div className={dropdown ? 'dropdown-list active' : 'dropdown-list'}>
            {tokens.map((token) => (
              <div
                key={token.tokenAddress}
                onClick={() => {
                  setSelectedToken(token)
                  setDropdown(false)
                }}
              >
                <img src={token.logo} alt="" />
                <p>{token.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="balance">
          <p>
            <span>Balance:</span>{' '}
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
          placeholder="0"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Max</button>
      </div>

      <div className="stake-btn">
        {!selectedToken.isApproved ? (
          <Button varient="primary" onClick={() => handleApproveToken()}>
            Approve
          </Button>
        ) : (
          <Button
            varient="secondary"
            onClick={() => {
              handlStake()
            }}
            disabled={loading}
          >
            Stake
          </Button>
        )}
      </div>

      <div className="min-max">
        <p>
          Min: <span>0.01</span>, Max: <span>100</span>
        </p>
      </div>
    </div>
  )
}

export default Plan
