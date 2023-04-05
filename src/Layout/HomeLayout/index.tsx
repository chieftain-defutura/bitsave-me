import React from 'react'

import HeaderNav from 'components/HeaderNav/index'
import './HomeLayout.scss'

interface IHomeLayout {
  children?: React.ReactNode
}

const HomeLayout: React.FC<IHomeLayout> = ({ children }) => {
  return (
    <div className="home-layout-container">
      <HeaderNav />

      <div className="home-layout-sideBar">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default HomeLayout
