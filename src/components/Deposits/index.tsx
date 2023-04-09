import React, { useCallback, useEffect, useRef, useState } from 'react'
// import React, { useCallback, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import Button from '../Button/Button'
import ReferralDepositsImg from '../../assets/images/referral-deposits-img.png'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import autoAnimate from '@formkit/auto-animate'
import './Deposits.scss'
import { useAccount, useSigner } from 'wagmi'
import { claimReferralBonus, getUserReferralData } from 'utils/userMethods'
import { tokensLists } from 'constants/tokenList'
import { useTransactionModal } from 'context/TransactionContext'
import { userStore } from 'store/userStore'
import { ArrElement } from 'constants/types'

const getBaseUrl = () => {
  const splitedurl = window.location.href.split('://')
  const domain = splitedurl[1].split('/')[0]
  return `${splitedurl[0]}://${domain}`
}

const Deposits: React.FC = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  //auto animate
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  const { address } = useAccount()
  const [copied, setCopied] = useState(false)
  const { data: signerData } = useSigner()
  const { setTransaction } = useTransactionModal()
  const [referralData, setReferralData] = useState<{
    referralList: string[]
    referralRewards: {
      tokenAddress: string
      isApproved: boolean
      name: string
      logo: string
      balance: number
      rewards: number
    }[]
  } | null>(null)
  const userStakedData = userStore((state) => state.userStakedData)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensLists>>()

  useEffect(() => {
    if (!copied) return

    const clear = setTimeout(() => setCopied(false), 3000)

    return () => {
      clearTimeout(clear)
    }
  }, [copied])

  const handleGetReferralData = useCallback(async () => {
    if (address && signerData) {
      try {
        setReferralData(
          await getUserReferralData(address, signerData, tokensLists),
        )
      } catch (error: any) {
        console.log(error)
      }
    }
  }, [address, signerData])

  useEffect(() => {
    handleGetReferralData()
  }, [handleGetReferralData])

  const handleClaim = async (tokenAddress: string) => {
    try {
      if (!address || !signerData) return

      setTransaction({ loading: true, status: 'pending' })
      await claimReferralBonus(address, signerData, tokenAddress)
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="deposits-wrapper">
      <div className="mx">
        <div className="deposits-container">
          <div className="deposits-first">
            <h4>
              Earn <span>1%</span> from each level 1 referral deposits.
            </h4>

            <div className="deposits-media">
              <img src={ReferralDepositsImg} alt="" />
            </div>

            <div className="box-content">
              <div className="box-flex-content">
                <input
                  type="search"
                  readOnly
                  value={
                    userStakedData.length > 0
                      ? `${getBaseUrl()}?ref=${address}`
                      : ''
                  }
                  placeholder="You will get your ref link after investing"
                />
                <div className="copy-btn">
                  <CopyToClipboard
                    text={`${getBaseUrl()}?ref=${address}`}
                    onCopy={() => setCopied(true)}
                  >
                    <Button
                      varient="primary"
                      disabled={userStakedData.length <= 0}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </CopyToClipboard>
                </div>
              </div>

              <div className="total-referrals">
                <h5>Total REFERRALS</h5>
                <h1>{referralData?.referralList.length}</h1>
              </div>

              <div className="dropDown">
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
              </div>

              <div className="referral-content">
                <div>
                  <h5>Total REFERRAL EARNED</h5>
                  <h1>0.000</h1>
                  {referralData?.referralRewards.map((data, index) => (
                    <div className="referral-content" key={index}>
                      <div>
                        <h5>Total REFERRAL EARNED ({data.name})</h5>
                        <h1>
                          {new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 4,
                          }).format(data.rewards)}
                        </h1>
                      </div>
                      <div className="Claim-btn">
                        <Button
                          varient="secondary"
                          onClick={() => handleClaim(data.tokenAddress)}
                          disabled={data.rewards <= 0}
                        >
                          Claim
                        </Button>
                      </div>
                    </div>
                  ))}
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
