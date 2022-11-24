import React from 'react'
import { BsXLg } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiSun } from 'react-icons/fi'
import { HiMoon } from 'react-icons/hi'
import { useContext } from 'react'
import { MyContext } from '../../App'
import "./style.css";
import "./needy.css";
const HeaderAdmin = () => {
  const { theme, setTheme } = useContext(MyContext)
  return (
    <div className='headr_admin'>
      <div className="image_admin_logo">
        <h1>Fit<span className='logo_name'>ra</span>t  In<span className='logo_name'>sa</span>n</h1>
        <button className="close"> <BsXLg /> </button> </div>
      <div className='top_admin'>
        <button id='menu-btn'>
          <AiOutlineMenu />
        </button>
        <div className='them-toggler_admin'>
          <button
            className='icon-light'>
            <FiSun />
          </button>
          <button icon-light onClick={() => { setTheme('dark') }
          }>
            <span><HiMoon /></span>

          </button>
        </div>


        <p> Hey,Admin </p>



      </div>
    </div>
  )
}

export default HeaderAdmin