import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const AppLayout = () => {
  return (
    <div>
<div className='grid-background'></div>
    <main className="min-h-screen container mx-auto">
      <Header/>
      <Outlet/>
      </main>
      <div className='p-10 m-10 bg-gray-800 text-center'>Made With ❤️ By Vishesh</div>
    </div>
  )
}

export default AppLayout