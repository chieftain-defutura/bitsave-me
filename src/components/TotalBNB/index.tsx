import React, { useMemo } from 'react'
import { useChainId, useContractReads } from 'wagmi'
import { ethers } from 'ethers'

import './TotalBNB.scss'
import { stakingABI } from 'utils/abi/stakingABI'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'

const TotalBNB: React.FC = () => {
  const chainId = useChainId()

  const { data: totalStakeAmount } = useContractReads({
    contracts: [
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'totalStakeAmount',
        args: [USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any],
      },
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'totalStakeAmount',
        args: [BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any],
      },
    ],
  })
  // const { data: totalReferralsAmount } = useContractReads({
  //   contracts: [
  //     {
  //       address: STAKING_CONTRACT_ADDRESS[
  //         chainId as keyof typeof STAKING_CONTRACT_ADDRESS
  //       ] as any,
  //       abi: stakingABI,
  //       functionName: 'totalReferralsAmount',
  //       args: [USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any],
  //     },
  //     {
  //       address: STAKING_CONTRACT_ADDRESS[
  //         chainId as keyof typeof STAKING_CONTRACT_ADDRESS
  //       ] as any,
  //       abi: stakingABI,
  //       functionName: 'totalReferralsAmount',
  //       args: [BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any],
  //     },
  //   ],
  // })

  const formattedTotalStakeAmount = useMemo(() => {
    if (!totalStakeAmount) return 0

    if (
      totalStakeAmount[0].result !== undefined &&
      totalStakeAmount[1].result !== undefined
    ) {
      return (
        Number(ethers.utils.formatEther(totalStakeAmount[0].result)) +
        Number(ethers.utils.formatEther(totalStakeAmount[1].result))
      )
    }

    return 0
  }, [totalStakeAmount])

  // const formattedTotalReferralsAmount = useMemo(() => {
  //   if (!totalReferralsAmount) return 0

  //   if (
  //     totalReferralsAmount[0].result !== undefined &&
  //     totalReferralsAmount[1].result !== undefined
  //   ) {
  //     return (
  //       Number(ethers.utils.formatEther(totalReferralsAmount[0].result)) +
  //       Number(ethers.utils.formatEther(totalReferralsAmount[1].result))
  //     )
  //   }

  //   return 0
  // }, [totalReferralsAmount])

  return (
    <div className="total-bnb-wrapper">
      <div className="mx">
        <div className="total-bnb-container">
          <div className="total-bnb-content">
            <p>Total Deposits</p>
            <h1>
              <span>
                {new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(formattedTotalStakeAmount)}
              </span>
            </h1>
          </div>
          {/* <div className="total-bnb-content">
            <p>Total Referral Rewards</p>
            <h1>
              <span>
                {new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(formattedTotalReferralsAmount)}
              </span>
            </h1>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default TotalBNB
