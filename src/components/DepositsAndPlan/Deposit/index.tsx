import React from 'react'
import './Deposit.scss'
import Button from 'components/Button/Button'
import { IStakedData, userStore } from 'store/userStore'
import { useAccount } from 'wagmi'
import { useTransactionModal } from 'context/TransactionContext'
import { claim, withdraw } from 'utils/userMethods'
import { tokensLists } from 'constants/tokenList'
import { Status } from 'constants/types'
import { useEthersSigner } from 'utils/ethers'

const plansData = [0, 30, 60, 90, 120]

const DepositData: React.FC<IStakedData & { index: number }> = ({
  amount,
  stakeIndex,
  planId,
  tokenAddress,
  earnings,
  index,
  endTime,
}) => {
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const signer = useEthersSigner()

  const handleClaim = async () => {
    try {
      if (!signer || !address) return

      setTransaction({ loading: true, status: 'pending' })
      await claim(address, signer, stakeIndex)
      setTransaction({ loading: true, status: 'success' })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error: any) {
      console.log(error.reason)
      setTransaction({ loading: true, status: 'error', message: error.reason })
    }
  }

  const handleWithdraw = async () => {
    try {
      if (!signer || !address) return

      setTransaction({ loading: true, status: 'pending' })

      await withdraw(address, signer, stakeIndex)

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
    <div className="details">
      <div className="flex-container">
        <div className="num">
          <p>{index}. </p>
        </div>
        <div className="content">
          <div className="flex-content">
            <h2>
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 4,
              }).format(amount)}
              &nbsp;
              {
                tokensLists.find(
                  (f) =>
                    f.tokenAddress.toLowerCase() === tokenAddress.toLowerCase(),
                )?.name
              }
            </h2>
          </div>
          <p>
            plan: <span>{plansData[Number(planId)]} Days</span>
          </p>
          <p>
            <span>Profit</span>:{' '}
            {new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            }).format(earnings)}
          </p>
        </div>
      </div>
      <div className="buttons">
        <div className="withdrawal-btn">
          <Button
            varient="secondary"
            disabled={endTime > new Date().getTime()}
            onClick={handleWithdraw}
          >
            Withdrawal
          </Button>
        </div>
        <Button varient="waring" onClick={handleClaim}>
          Claim
        </Button>
      </div>
    </div>
  )
}

const Deposit: React.FC = () => {
  const userStakedData = userStore((state) => state.userStakedData)

  return (
    <div className="card-2">
      <div className="deposit-container">
        <h1>your deposits</h1>
        <div className="deposit">
          {userStakedData
            .filter((f) => f.status === Status.PENDING)
            .map((data, index) => (
              <DepositData {...data} index={index + 1} key={index.toString()} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Deposit
