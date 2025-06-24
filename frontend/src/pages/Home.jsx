import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import useGetMessages from '../customHooks/useGetMessages'



function Home() {
  let {selectedUser}=useSelector(state=>state.user)
 useGetMessages()
  return (
    <div className='w-full h-[100vh] flex  '>
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home
