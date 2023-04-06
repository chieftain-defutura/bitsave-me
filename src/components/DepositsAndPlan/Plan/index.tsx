import React, { useState } from 'react'
import { ethers } from 'ethers'

import Button from '../../Button/Button'
import { useAccount, useSigner } from 'wagmi'
import TokenAbi from '../../../utils/abi/tokenABI.json'
import StakeAbi from '../../../utils/abi/stakingABI.json'

import { useTransactionModal } from 'context/TransactionContext'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from 'utils/messaging'
import './Plan.scss'
import {
  BUSD_TOKEN_ADDRESS,
  STAKE_CONTRACT_ADDRESS,
  USDT_TOKEN_ADDRESS,
} from 'utils/contractAddress'
import { parseUnits } from 'ethers/lib/utils.js'

const Plan = () => {
  const { address } = useAccount()
  const { data: signerData } = useSigner()
  const { setTransaction, loading } = useTransactionModal()
  const [tokenAddress, setTokenAddress] = useState(BUSD_TOKEN_ADDRESS)
  const [plan, setPlan] = useState('1')
  const [amount, setAmount] = useState('0')

  const handleApproveToken = async () => {
    try {
      if (!signerData || !address) return

      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const nftContract = new ethers.Contract(
        tokenAddress,
        TokenAbi,
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
      if (!tokenAddress || !signerData) return
      const nftContract = new ethers.Contract(
        STAKE_CONTRACT_ADDRESS,
        StakeAbi,
        signerData,
      )
      const tx = await nftContract.stake(
        plan,
        parseUnits(amount, '18'),
        tokenAddress,
        '',
      )
      await tx.wait()
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
        <input type="text" onChange={(e) => setAmount(e.target.value)} />
        <h4>Max</h4>
      </div>

      <div className="button">
        <button onClick={() => handleApproveToken()}>Approve</button>

        <Button
          varient="primary"
          onClick={() => {
            handlStake()
          }}
          disabled={loading}
        >
          Stake
        </Button>
      </div>

      <div className="min-max">
        <p>Min: 0.01, Max:100</p>
      </div>
    </div>
  )
}

export default Plan
