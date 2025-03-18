import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, NavBar } from '../components/'



const MainLayout = () => {

  return (
    <div>
      <NavBar />
      <div className='bg-neutral-400 min-h-screen flex flex-col'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
