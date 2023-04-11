import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from './BackDrop'
import { modalVaraints } from '../constants/variants'
import { useSwitchNetwork } from 'wagmi'
import './Modal.scss'

interface IWrongNetworkModal {
  modal: boolean
  handleClose?: () => void
}
const WrongNetworkModal: React.FC<IWrongNetworkModal> = ({
  modal,
  handleClose,
}) => {
  const { switchNetworkAsync } = useSwitchNetwork()
  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={'transaction_modal'}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="transaction_modal-content">
              <h2>Wrong network</h2>
              <button
                onClick={async () => {
                  try {
                    const data = await switchNetworkAsync?.(97)
                    console.log(data)
                  } catch (error) {
                    console.log(error)
                  }
                }}
                style={{
                  background:
                    'linear-gradient(98.86deg, #FEA823 -0.11%, #EB7F00 99.89%)',
                  borderRadius: ' 8px',
                  color: '#fff',
                  padding: '15px 20px',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  margin: '0 auto',
                  fontSize: '16px',
                }}
              >
                Switch Network
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  )
}

export default WrongNetworkModal
