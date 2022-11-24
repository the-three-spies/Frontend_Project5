import React from 'react'
import Sidebar from './Sidebar';
import "./style.css";
import NewSoct from '../Socket';
const ChatAdmin = () => {
  return (
    <>
   
    <div className='admin_panal'>
      <div className='container_panel'>
        <Sidebar/>  
        <div className='main_dashbored'>
            <h1>
                Chat Services
            </h1>
        <NewSoct/>
        </div>
      </div>
      </div>
    </>
        
  )
}

export default ChatAdmin