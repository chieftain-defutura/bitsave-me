import React from 'react'
import './Deposit.scss'
import Button from 'components/Button/Button'
// import { IStakedData, userStore } from 'store/userStore'
// import { useAccount, useSigner } from 'wagmi'
// import { useTransactionModal } from 'context/TransactionContext'
// import { claim, withdraw } from 'utils/userMethods'

// const DepositData: React.FC<IStakedData> = ({ amount, stakeIndex }) => {
//   const { address } = useAccount()
//   const { data: signerData } = useSigner()
//   const { setTransaction } = useTransactionModal()

//   const handleClaim = async () => {
//     try {
//       if (!signerData || !address) return

//       await claim(address, signerData, stakeIndex)
//       setTransaction({ loading: true, status: 'success' })
//       setTimeout(() => {
//         window.location.reload()
//       }, 3000)
//     } catch (error: any) {
//       console.log(error.reason)
//       setTransaction({ loading: true, status: 'error', message: error.reason })
//     }
//   }

//   const handleWithdraw = async () => {
//     try {
//       if (!signerData || !address) return

//       await withdraw(address, signerData, stakeIndex)

//       setTransaction({ loading: true, status: 'success' })
//       setTimeout(() => {
//         window.location.reload()
//       }, 3000)
//     } catch (error: any) {
//       console.log(error.reason)
//       setTransaction({ loading: true, status: 'error', message: error.reason })
//     }
//   }

//   return (
//     <div className="details">
//       <div className="content">
//         <div className="flex-content">
//           <h2>1. {new Intl.NumberFormat().format(amount)}$</h2>
//           <h2>BUSD</h2>
//         </div>
//         <p>plan: 30Days</p>
//         <p>Profit:0.002</p>
//       </div>
//       <div className="buttons">
//         <div className="withdrawal-btn">
//           <Button varient="secondary" onClick={() => handleWithdraw()}>
//             Withdrawal
//           </Button>
//         </div>
//         <Button varient="waring" onClick={() => handleClaim()}>
//           Claim
//         </Button>
//       </div>
//     </div>
//   )
// }

const Deposit: React.FC = () => {
  // const userStakedData = userStore((state) => state.userStakedData)

  return (
    <div className="card-2">
      <div className="deposit-container">
        <h1>your deposits</h1>
        <div className="deposit">
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>1. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>1. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>1. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>1. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>

          {/* {userStakedData.map((data, index) => (
            <DepositData {...data} key={index.toString()} />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Deposit
