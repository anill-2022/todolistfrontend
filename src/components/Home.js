import React from 'react'
import Addtodos from './Addtodos'

function Home() {
  return (
    <>
      <div className='display-4 bg-[#1a1a1a] text-info text-center' style={{fontFamily:"Bungee Shade"}}>
        Welcome {localStorage.getItem('name')}
      </div>
      <Addtodos/>
    </>
  )
}

export default Home
