import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Components/AdminSidebar/AdminSidebar'

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar />
      <div className='bg-[#f3f3f7] min-h-[calc(100vh-88px)]'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout