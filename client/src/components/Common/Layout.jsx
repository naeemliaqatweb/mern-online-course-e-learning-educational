import React from 'react'
import TopHeader from './TopHeader'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ImpersonationBanner from './ImpersonationBanner'

const Layout = () => {
  return (
    <div className='be-vietnam-pro-regular'>
      <ImpersonationBanner />
      <TopHeader />
      <Header />
      <main className="flex flex-col w-full mt-10">
        <Outlet />
      </main>
      <Footer />

    </div>
  )
}

export default Layout
