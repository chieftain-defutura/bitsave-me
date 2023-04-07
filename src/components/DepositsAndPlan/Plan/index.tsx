import React, { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Button from '../../Button/Button'
import { useAccount, useSigner } from 'wagmi'
import TokenAbi from '../../../utils/abi/tokenABI.json'
import ChevronDown from '../../../assets/icons/chevron-down.svg'

import { useTransactionModal } from 'context/TransactionContext'
import './Plan.scss'
import { STAKE_CONTRACT_ADDRESS } from 'utils/contractAddress'
import {
  getIsApproved,
  getUserContractData,
  getUserTokenBalance,
  stake,
} from 'utils/userMethods'
import { userStore } from 'store/userStore'
import { useSearchParams } from 'react-router-dom'
import { tokensLists } from 'constants/tokenList'

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
  const [searchParams] = useSearchParams()
  const referral_address = searchParams.get('ref')

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

  return (
    <div className="plan-container">
      <div className="plan-dropdown">
        <h3>PLAN</h3>
        <select name="" id="" onChange={(e) => setPlan(e.target.value)}>
          <option value="1">30days</option>
          <option value="2">60days</option>
          <option value="3">90days</option>
          <option value="4">120days</option>
        </select>
      </div>
      <div className="profit">
        <div className="profit-content">
          <h3>daily profit</h3>
          <h1>
            <span>1%</span>
          </h1>
        </div>
        <div className="profit-content">
          <h3>Total profit</h3>
          <h1>
            <span>30%</span>
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
          placeholder="0"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>max</button>
      </div>

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
          disabled={loading}
        >
          Stake
        </Button>
      )}

      <div className="min-max">
        <p>Min: 10, Max:100000</p>
      </div>
    </div>
  )
}

export default Plan
