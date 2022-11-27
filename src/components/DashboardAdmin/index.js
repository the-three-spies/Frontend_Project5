import React from 'react'
import Header from './header';
import Maindashboard from './Maindash';
import RightSide from './right';
import Sidebar from './Sidebar';
import { useState,useContext } from 'react';
import "./admin2.css";
import "./admin.css"
import { MyContext } from '../../App';
const AdminPanel = () => {
   const {theme}=useContext(MyContext)

  return (
    <>
  
    <div className={theme==='dark'?'dark adminpanel':'adminpanel'}>
      <div className="container_panel_a">
        <Sidebar/>
        <Maindashboard/>
        <RightSide/>
      </div>
      </div>
    </>
  )
}

export default AdminPanel