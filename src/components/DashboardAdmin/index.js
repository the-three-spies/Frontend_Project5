import React from 'react'
import Header from './header';
import Maindashboard from './Maindash';
import RightSide from './right';
import Sidebar from './Sidebar';
import { useState,useContext } from 'react';
import "./needy.css";
import "./style.css"
import { MyContext } from '../../App';
const AdminPanel = () => {
   const {theme}=useContext(MyContext)

  return (
    <>
  
    <div className='admin_panal'>
      <div className={theme==='dark'?'container_panel_a dark-them':'container_panel_a'}>
        <Sidebar/>
        <Maindashboard/>
        <RightSide/>
      </div>
      </div>
    </>
  )
}

export default AdminPanel