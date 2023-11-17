import Button from 'components/Button/Button'
import { useTransactionModal } from 'context/TransactionContext'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { stakingABI } from 'utils/abi/stakingABI'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'
import { useChainId, useContractWrite, useWaitForTransaction } from 'wagmi'

const AdminWithdraw = () => {
  const chainId = useChainId()
  const { setTransaction } = useTransactionModal()
  const [usdtAmount, setUsdtAmount] = useState('')
  const [busdAmount, setBusdAmount] = useState('')

  const { error, write, data } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'withdrawAdminFunds',
  })
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash })

  useEffect(() => {
    if (error) {
      setTransaction({ loading: true, status: 'error', message: error.message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      setTransaction({ loading: true, status: 'success' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleWithdraw = (tokenAddress: string, amount: string) => {
    setTransaction({ loading: true, status: 'pending' })

    write({
      args: [tokenAddress as any, ethers.utils.parseEther(amount).toBigInt()],
    })
  }

  return (
    <div className="grid">
      <div>
        <input
          type="number"
          value={usdtAmount}
          onChange={(e) => setUsdtAmount(e.target.value)}
        />
        <Button
          varient={'primary'}
          onClick={() =>
            handleWithdraw(
              USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS],
              usdtAmount,
            )
          }
        >
          Withdraw USDT
        </Button>
      </div>
      <div>
        <input
          type="number"
          value={busdAmount}
          onChange={(e) => setBusdAmount(e.target.value)}
        />
        <Button
          varient={'primary'}
          onClick={() =>
            handleWithdraw(
              BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS],
              busdAmount,
            )
          }
        >
          Withdraw BUSD
        </Button>
      </div>
    </div>
  )
}

export default AdminWithdraw
