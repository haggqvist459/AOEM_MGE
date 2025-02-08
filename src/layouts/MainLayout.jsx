import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components/'
import { HomePage } from '../pages'


const MainLayout = () => {

  return (
    <div>
      <Header />
      <div className='bg-neutral-400 min-h-screen flex flex-col py-5'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
