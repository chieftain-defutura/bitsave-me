import React, { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface button extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient: 'primary' | 'secondary' | 'waring'
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  onClick?: () => void
}
const Button: React.FC<button> = ({ varient, size, children, ...rest }) => {
  return (
    <button className={`btn btn-${varient} ${size} `} {...rest}>
      {children}
    </button>
  )
}
export default Button
