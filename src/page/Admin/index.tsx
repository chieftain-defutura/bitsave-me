import React from 'react'

import './Admin.scss'
import AdminDeposit from './AdminDeposit'
import AdminWithdraw from './AdminWithdraw'
import { erc20ABI, useChainId, useContractRead } from 'wagmi'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'
import { ethers } from 'ethers'

const Admin = () => {
  const chainId = useChainId()

  const { data: usdtBalance } = useContractRead({
    address: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [
      STAKING_CONTRACT_ADDRESS[
        chainId as keyof typeof STAKING_CONTRACT_ADDRESS
      ] as any,
    ],
  })
  const { data: busdBalance } = useContractRead({
    address: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [
      STAKING_CONTRACT_ADDRESS[
        chainId as keyof typeof STAKING_CONTRACT_ADDRESS
      ] as any,
    ],
  })

  return (
    <div className="grid-container">
      <div className="flex-between">
        <h2>Contract Balance (USDT)</h2>
        <h2>{usdtBalance ? ethers.utils.formatEther(usdtBalance) : 0} USDT</h2>
      </div>
      <div className="flex-between" style={{ marginBottom: '20px' }}>
        <h2>Contract Balance (BUSD)</h2>
        <h2>{busdBalance ? ethers.utils.formatEther(busdBalance) : 0} BUSD</h2>
      </div>
      <h2>Withdraw Funds from contract</h2>
      <AdminWithdraw />
      <h2>Deposit Funds to Contract</h2>
      <AdminDeposit />
    </div>
  )
}

export default Admin
