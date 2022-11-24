import React from 'react'
import Sidebar from './Sidebar';
import "./style.css";
import MyResponsivePie from "./pie";
import MyResponsivePie1 from "./pie2";
import MyResponsivePie3 from "./pie3";
import MyResponsivePie4 from './pier4';
const Analytics = () => {
  return (
  
    <>
    <div className='admin_panal'>
      <div className='container_panel'>
        <Sidebar/>  
        <div className='main_dashbored'>
        <h1> Analytics </h1>
        <div className="pie_chart">
        <MyResponsivePie />
        <MyResponsivePie1 />
        <MyResponsivePie3 />
      </div>
        <MyResponsivePie4/>
       </div>  
      </div>
      </div>
    </>
  )
}

export default Analytics