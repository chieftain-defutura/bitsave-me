import Button from 'components/Button/Button'
import React, { useState } from 'react'
import './Disclaimer.scss'

const Disclaimer: React.FC = () => {
  const [showmore, setShowMore] = useState<boolean>()
  return (
    <div className="disclaimer-wrapper">
      <div className="mx">
        <h2>Disclaimer</h2>
        <div className="disclaimer-content">
          <p>
            Disclaimer: The following message is intended to provide important
            information about Bitsave, a crypto company. Please read this
            disclaimer carefully before using our platform.
          </p>
          {showmore ? (
            <>
              <p>
                Bitsave is a cryptocurrency stakement and trading platform that
                allows users to stake and hold various digital assets. While we
                strive to provide a safe and secure platform for our users, it
                is important to understand the inherent risks associated with
                staking in cryptocurrencies.
              </p>
              <p>
                staking in cryptocurrencies can be highly volatile and
                unpredictable. The value of cryptocurrencies can rise and fall
                rapidly, and there is no guarantee of profit or return on
                stakement. Additionally, cryptocurrencies are not backed by any
                government or central authority, and their value is not linked
                to any tangible asset or commodity.
              </p>
              <p>
                Bitsave is not a registered stakement advisor, broker-dealer, or
                financial institution. We do not provide stakement advice or
                recommendations, and we are not responsible for any losses or
                damages that may occur as a result of using our services.
              </p>
              <p>
                It is important to conduct your own research and due diligence
                before staking in any cryptocurrency. We encourage all users to
                be cautious and responsible when staking in cryptocurrencies and
                to only stake what they can afford to lose.
              </p>
              <p>
                By using our platform, you acknowledge and accept the risks
                associated with staking in cryptocurrencies and agree to hold
                Bitsave harmless from any losses or damages that may occur.
              </p>
            </>
          ) : (
            ''
          )}
          <Button onClick={() => setShowMore(!showmore)} varient={'primary'}>
            {showmore ? 'Showless' : 'ShowMore'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
