import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ImpersonationBanner from '../../../components/Common/ImpersonationBanner'

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <ImpersonationBanner />
      <div className="flex flex-1 w-full">
        {/* admin sidebar */}
        {/* <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} /> */}
        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className="flex flex-1 flex-col">
          {/* admin header */}
          {/* <AdminHeader setOpen={setOpenSidebar} /> */}
          <Header setOpen={setOpenSidebar} />
          <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
