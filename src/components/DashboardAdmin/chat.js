import React,{useContext} from 'react'
import Sidebar from './Sidebar';
import "./admin.css";
import { MyContext } from '../../App';
import NewSoct from '../Socket';

const ChatAdmin = () => {
  
  const {theme}=useContext(MyContext)
  return (
    <>
   
   <div className={theme==='dark'?'dark adminpanel':'adminpanel'}>
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