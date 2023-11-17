import Button from 'components/Button/Button'
import { useTransactionModal } from 'context/TransactionContext'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'
import {
  erc20ABI,
  useChainId,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const AdminDeposit = () => {
  const chainId = useChainId()
  const { setTransaction } = useTransactionModal()
  const [usdtAmount, setUsdtAmount] = useState('')
  const [busdAmount, setBusdAmount] = useState('')

  const {
    data,
    error,
    write: writeUSDT,
  } = useContractWrite({
    address: USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any,
    abi: erc20ABI,
    functionName: 'transfer',
  })
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash })
  const {
    data: busdData,
    error: busdError,
    write: writeBUSD,
  } = useContractWrite({
    address: BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any,
    abi: erc20ABI,
    functionName: 'transfer',
  })
  const { isSuccess: busdSuccess } = useWaitForTransaction({
    hash: busdData?.hash,
  })

  useEffect(() => {
    if (error) {
      setTransaction({ loading: true, status: 'error', message: error.message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      setTransaction({ loading: true, status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (busdError) {
      setTransaction({
        loading: true,
        status: 'error',
        message: busdError.message,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busdError])

  useEffect(() => {
    if (busdSuccess) {
      setTransaction({ loading: true, status: 'success' })

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busdSuccess])

  const handleDepositUSDT = (amount: string) => {
    setTransaction({ loading: true, status: 'pending' })
    writeUSDT({
      args: [
        STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        ethers.utils.parseEther(amount).toBigInt(),
      ],
    })
  }

  const handleDepositBUSD = (amount: string) => {
    setTransaction({ loading: true, status: 'pending' })
    writeBUSD({
      args: [
        STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        ethers.utils.parseEther(amount).toBigInt(),
      ],
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
          onClick={() => handleDepositUSDT(usdtAmount)}
        >
          Deposit USDT
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
          onClick={() => handleDepositBUSD(busdAmount)}
        >
          Deposit BUSD
        </Button>
      </div>
    </div>
  )
}

export default AdminDeposit
