import "./header.css";
import "./header.css";

import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
// import HeaderTop from "./headerTop";
const VideoNav = () => {
  //------------------------------------- here will make navbar and logo
  //navigate
  const navigate = useNavigate();
  //useState
  const [toggle, setToggle] = useState(false);
  const [showLoginLogout, setShowLoginLogout] = useState(false);
  //useSelector
  const {auth ,userId,token,userName,stateRole ,isLoggedIn}= useSelector((state) => {
    return {
      auth: state.auth.isLoggedIn,
      userId: state.auth.userId,
      token: state.auth.token,
      userName:state.auth.userName,
      stateRole:state.auth.stateRole,
      isLoggedIn:state.auth.isLoggedIn,
    };
  });
  //useDispatch
  const dispacth = useDispatch()
  //------------- search bar -------------
  const search = () => {};
//------------- 2. show Login Logout -------------
    const showLoginLogoutHandler = () => {
      setShowLoginLogout((prev) => !prev);
    };
  //------------- return -------------
  return ( 
    <header className="header_vidNav">
<div className="logo_vidNav">
      {/* <img src= 'https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668184372/project5/fitrat_iNsan22_x8fcjb.png'  alt="img" className="logo-img"/> */}
      <div className="logo-text_vidNav">
        <Link to="/home" className="header-middle-logo_vidNav">
        <b>Fitrat</b>
        <b>Insan</b>
        </Link>
      </div>
      </div>
      <nav style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar_vidNav">
        <ul className="navbar-links_vidNav">
        <Link to="/about" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>About</Link>
        <Link to="/ourStory" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>Our Story</Link>
        <Link to="/FAQs" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>FAQs</Link>
        <Link to="/contact" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>Contact</Link>
        <Link to="/ApiPag" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>Buy</Link>
        <Link to="/check" className="navbar-link_vidNav" onClick={()=>{setToggle(false)}}>Donate</Link>
        </ul>
      </nav>
      {/* ----login logout---- */}
      {!isLoggedIn ?
      <div className="header-top-links-inout_vidNav">
      {/* {showLoginLogout ? (onClick={showLoginLogoutHandler}):(onClick={showLoginLogoutHandler})} */}
          <Link to="/login" className="header-top-link_vidNav">
            {/* <i className="bi bi-person"></i> */}
            Login
          </Link>
          <Link to="/register" className="header-top-link_vidNav">
            Register
          </Link>
        </div>
: <div> <Link to="/login" onClick={()=>{ dispacth(setLogout())}} className="logout_vidNav" > Logout</Link></div>}
      <div onClick={()=> setToggle(prev=>!prev)} className="header-menu_vidNav">
        {toggle ?<i className="bi bi-x-lg" style={{color:"#fff"}} ></i>: <i className="bi bi-list" style={{color:"#fff"}}></i>}
      </div>
    </header>
  );
};
export default VideoNav;
