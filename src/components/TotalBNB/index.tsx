import { tokensLists } from 'constants/tokenList'
import React, { useCallback, useEffect, useState } from 'react'
import { getStatsOfToken } from 'utils/userMethods'
import { ITotalBNB } from './TotalBNB'
import './TotalBNB.scss'

const TotalBNB: React.FC = () => {
  const [data, setData] = useState<typeof ITotalBNB>(ITotalBNB)

  const handleGetData = useCallback(async () => {
    try {
      const statsData = await getStatsOfToken(tokensLists)
      if (!statsData) return
      const newData = [...data]
      newData[0].bnb = statsData[0].totalStaked
      newData[1].bnb = statsData[0].totalReferralRewards
      newData[2].bnb = statsData[1].totalStaked
      newData[3].bnb = statsData[1].totalReferralRewards
      setData(newData)
    } catch (error) {
      console.log(error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  return (
    <div className="total-bnb-wrapper">
      <div className="mx">
        <div className="total-bnb-container">
          {ITotalBNB.map((f, index) => {
            return (
              <div key={index} className="total-bnb-content">
                <p>{f.title}</p>
                <h1>
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(f.bnb)}
                    &nbsp;{f.symbol}
                  </span>
                </h1>
                {/* <h6>{f.dollar}</h6> */}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TotalBNB
