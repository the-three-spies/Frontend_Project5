import React,{useContext} from 'react'
import Sidebar from './Sidebar';
import "./admin.css";
import MyResponsivePie from "./pie";
import MyResponsivePie1 from "./pie2";
import MyResponsivePie3 from "./pie3";
import MyResponsivePie4 from './pier4';
import { MyContext } from '../../App';
const Analytics = () => {
  
  const {theme}=useContext(MyContext)
  return (
  
    <>
   {/* <div className={theme==='dark'?'dark adminpanel':'adminpanel'}> */}
   <div className="adminpanel">
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