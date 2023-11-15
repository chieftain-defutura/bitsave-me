import React, { useEffect, useRef, useState } from 'react'
// import React, { useCallback, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import Button from '../Button/Button'
import ReferralDepositsImg from '../../assets/images/referral-deposits-img.png'
// import Usdt from '../../assets/icons/usd-coin.svg'
// import ChevronDown from '../../assets/icons/chevron-down.svg'
// import USDT from '../../assets/icons/usdt.png'
import autoAnimate from '@formkit/auto-animate'
import './Deposits.scss'
import {
  useAccount,
  useChainId,
  useContractRead,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useTransactionModal } from 'context/TransactionContext'
import {
  BUSD_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  USDT_ADDRESS,
} from 'utils/address'
import { stakingABI } from 'utils/abi/stakingABI'
import { ethers } from 'ethers'
// import { ArrElement } from 'constants/types'

const getBaseUrl = () => {
  const splitedurl = window.location.href.split('://')
  const domain = splitedurl[1].split('/')[0]
  return `${splitedurl[0]}://${domain}`
}

const Deposits: React.FC = () => {
  // const [dropDownOpen, setDropDownOpen] = useState(false)

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  const { address } = useAccount()
  const chainId = useChainId()
  const [copied, setCopied] = useState(false)
  const { setTransaction } = useTransactionModal()

  const { data: isOldUser } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'isOldUser',
    args: [address as any],
  })
  const { data: referralsList } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'getUserReferralList',
    args: [address as any],
  })

  const { data: referralRewards, refetch } = useContractReads({
    contracts: [
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'getUserReferralRewards',
        args: [
          address as any,
          USDT_ADDRESS[chainId as keyof typeof USDT_ADDRESS] as any,
        ],
      },
      {
        address: STAKING_CONTRACT_ADDRESS[
          chainId as keyof typeof STAKING_CONTRACT_ADDRESS
        ] as any,
        abi: stakingABI,
        functionName: 'getUserReferralRewards',
        args: [
          address as any,
          BUSD_ADDRESS[chainId as keyof typeof BUSD_ADDRESS] as any,
        ],
      },
    ],
  })

  const { data, isError, write } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS[
      chainId as keyof typeof STAKING_CONTRACT_ADDRESS
    ] as any,
    abi: stakingABI,
    functionName: 'claimReferralBonus',
  })
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash })
  // const [selectedDropDown, setSelectedDropDown] =
  //   useState<ArrElement<typeof tokensLists>>()

  useEffect(() => {
    if (!copied) return

    const clear = setTimeout(() => setCopied(false), 3000)

    return () => {
      clearTimeout(clear)
    }
  }, [copied])

  useEffect(() => {
    if (isError) {
      setTransaction({ loading: true, status: 'error' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      setTransaction({ loading: true, status: 'success' })

      setTimeout(() => {
        refetch()
      }, 3000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleClaim = async (tokenAddress: string) => {
    setTransaction({ loading: true, status: 'pending' })

    write({ args: [tokenAddress as any] })
  }

  return (
    <div className="deposits-wrapper">
      <div className="mx">
        <div className="deposits-container">
          <div className="deposits-first">
            <h4>
              Earn <span>5%</span> from each level 1 referral deposits.
            </h4>

            <div className="deposits-media">
              <img src={ReferralDepositsImg} alt="" />
            </div>

            <div className="box-content">
              <div className="box-flex-content">
                <input
                  type="search"
                  readOnly
                  value={isOldUser ? `${getBaseUrl()}?ref=${address}` : ''}
                  placeholder="You will get your ref link after staking"
                />
                <div className="copy-btn">
                  <CopyToClipboard
                    text={`${getBaseUrl()}?ref=${address}`}
                    onCopy={() => setCopied(true)}
                  >
                    <Button varient="primary" disabled={!isOldUser}>
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </CopyToClipboard>
                </div>
              </div>

              <div className="total-referrals">
                <h5>Total REFERRALS</h5>
                <h1>{referralsList?.length ?? 0}</h1>
              </div>

              {/* <div className="dropDown">
                <div
                  className="select-dropDown"
                  onClick={() => setDropDownOpen(!dropDownOpen)}
                >
                  <img
                    src={selectedDropDown?.logo}
                    alt=""
                    style={{ borderRadius: '50%' }}
                  />
                  <p>{selectedDropDown?.name}</p>
                  <img src={ChevronDown} alt="" className="chevronDown" />
                </div>
                <div ref={parent}>
                  {dropDownOpen && (
                    <div className="dropDown-list">
                      {tokensLists.map((f, index) => {
                        return (
                          <div
                            className="dropDown-items usdt-img"
                            key={index}
                            onClick={() => {
                              setSelectedDropDown(f)
                            }}
                          >
                            <img src={f.logo} alt="" />
                            <p>{f.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div> */}

              <div>
                <div>
                  {/* <h5>Total REFERRAL EARNED</h5>
                  <h1>0.000</h1> */}
                  {referralRewards &&
                    referralRewards[0]['result'] !== undefined && (
                      <div className="referral-content">
                        <div>
                          <h5>Total REFERRAL EARNED (USDT)</h5>
                          <h1>
                            {new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 4,
                            }).format(
                              Number(
                                ethers.utils.formatEther(
                                  referralRewards[0]['result'] ?? '0',
                                ),
                              ),
                            )}
                          </h1>
                        </div>
                        <div className="Claim-btn">
                          <Button
                            varient="secondary"
                            disabled={
                              !Number(
                                ethers.utils.formatEther(
                                  referralRewards[0]['result'] ?? '0',
                                ),
                              )
                            }
                            onClick={() =>
                              handleClaim(
                                USDT_ADDRESS[
                                  chainId as keyof typeof USDT_ADDRESS
                                ] as any,
                              )
                            }
                            // disabled={data.rewards <= 0}
                          >
                            Claim
                          </Button>
                        </div>
                      </div>
                    )}
                  {referralRewards &&
                    referralRewards[1]['result'] !== undefined && (
                      <div className="referral-content">
                        <div>
                          <h5>Total REFERRAL EARNED (BUSD)</h5>
                          <h1>
                            {new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 4,
                            }).format(
                              Number(
                                ethers.utils.formatEther(
                                  referralRewards[1]['result'] ?? '0',
                                ),
                              ),
                            )}
                          </h1>
                        </div>
                        <div className="Claim-btn">
                          <Button
                            varient="secondary"
                            disabled={
                              !Number(
                                ethers.utils.formatEther(
                                  referralRewards[1]['result'] ?? '0',
                                ),
                              )
                            }
                            onClick={() =>
                              handleClaim(
                                BUSD_ADDRESS[
                                  chainId as keyof typeof BUSD_ADDRESS
                                ] as any,
                              )
                            }
                            // disabled={data.rewards <= 0}
                          >
                            Claim
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="deposit-para">
              <span>Deposit Atleast Once To Activate Referral Rewards.</span>
            </div>
          </div>
          <div className="deposits-second">
            <img src={ReferralDepositsImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposits
