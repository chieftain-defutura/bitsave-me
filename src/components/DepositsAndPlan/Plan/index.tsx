import React, { useState } from 'react'
import { ethers } from 'ethers'

import Button from 'components/Button'
import { useContractReads, erc20ABI, useAccount, useSigner } from 'wagmi'

import { useTransactionModal } from 'context/TransactionContext'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from 'utils/messaging'
import './Plan.scss'
import {
  BUSD_TOKEN_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from 'utils/contractAddress'

interface IContractData {
  title: string
  contractAddress: string
  tokenAddress?: string
  allowance?: number
}

const ContractData = [
  {
    title: 'BUSD',
    tokenAddress: BUSD_TOKEN_ADDRESS,
    allowance: 0,
  },
  {
    title: 'USDT',
    tokenAddress: USDT_TOKEN_ADDRESS,
    allowance: 0,
  },
]

const Plan = () => {
  const { setTransaction, loading } = useTransactionModal()
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const [tokenAddress, setTokenAddress] = useState(BUSD_TOKEN_ADDRESS)
  const [canShow, setCanShow] = useState('')
  console.log(tokenAddress)
  const handleApproveToken = async () => {
    try {
      if (!signerData) return

      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const nftContract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signerData,
      )
      const tx = await nftContract.approve(
        STAKE_CONTRACT_ADDRESS,
        ethers.constants.MaxUint256,
      )
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
        message: SUCCESS_MESSAGE,
      })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handlStake = async () => {
    try {
      console.log('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="plan-container">
      <div className="plan-dropdown">
        <h3>PLAN</h3>
        <select name="" id="">
          <option value="">30days</option>
          <option value="">60days</option>
          <option value="">90days</option>
        </select>
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
        <div className="busd-dropdown">
          <select
            name=""
            id=""
            onChange={(e) => setTokenAddress(e.target.value)}
          >
            <option value={BUSD_TOKEN_ADDRESS}>BUSD</option>
            <option value={USDT_TOKEN_ADDRESS}>USDT</option>
          </select>
        </div>
        <div className="balance">
          <p>Balance:0.00002</p>
        </div>
      </div>
      <div className="max-container">
        <p>0</p>
        <h4>Max</h4>
      </div>

      <div className="button">
        {canShow ? (
          <button onClick={() => handleApproveToken()}>Approve</button>
        ) : (
          <button
            className="btn-mint"
            onClick={() => {
              handlStake()
            }}
            disabled={loading}
          >
            Create
          </button>
        )}
      </div>
      <Button variant="primary">Stake</Button>
      <div className="min-max">
        <p>Min: 0.01, Max:100</p>
      </div>
    </div>
  )
}

export default Plan
