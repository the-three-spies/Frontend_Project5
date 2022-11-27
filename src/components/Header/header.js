import "./header.css";
import "./header.css";

import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
// import HeaderTop from "./headerTop";
const Header = () => {
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
  //------------- return -------------https://pledgeling-res.cloudinary.com/image/upload/c_lpad,h_144,w_144/v1/shared/about/values/care.png
  return ( //1.header //2.navbar //3.change the nav to list menu for resopnsive desigin
    <header className="header">
<div className="logo">
      <img src= 'https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668184372/project5/fitrat_iNsan22_x8fcjb.png'  alt="img" className="logo-img"/>
      {/* <img src= 'https://pledgeling-res.cloudinary.com/image/upload/c_lpad,h_144,w_144/v1/shared/about/values/care.png'  alt="img" className="logo-img"/> */}
      <div className="logo-text">
        <Link to="/home" className="header-middle-logo">
        <b>Fitrat</b>
        <b>Insan</b>
        {/* <b>Donation</b> */}
        </Link>
      </div>
      </div>
      <nav style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
        <ul className="navbar-links">
        {/* <Link to="/Showcategories" className="navbar-link" onClick={()=>{setToggle(false)}}>Category</Link> */}
        <Link to="/about" className="navbar-link" onClick={()=>{setToggle(false)}}>About</Link>
        <Link to="/ourStory" className="navbar-link" onClick={()=>{setToggle(false)}}>Our Story</Link>
        <Link to="/FAQs" className="navbar-link" onClick={()=>{setToggle(false)}}>FAQs</Link>
        <Link to="/contact" className="navbar-link" onClick={()=>{setToggle(false)}}>Contact</Link>
        <Link to="/ApiPag" className="navbar-link" onClick={()=>{setToggle(false)}}>Buy</Link>
        <Link to="/check" className="navbar-link" onClick={()=>{setToggle(false)}}>Donate</Link>
        {/* <Link to="/ourTeam" className="navbar-link" onClick={()=>{setToggle(false)}}>Our Team</Link> */}
          {/* <li onClick={()=>{setToggle(false)}} className="navbar-link">FAQs</li> */}
        </ul>
      </nav>
      {/* ----login logout---- */}
      {!isLoggedIn ?
      <div className="header-top-links-inout">
      {/* {showLoginLogout ? (onClick={showLoginLogoutHandler}):(onClick={showLoginLogoutHandler})} */}
          <Link to="/login" className="header-top-link">
            {/* <i className="bi bi-person"></i> */}
            Login<i class="bi bi-person-fill"></i>|
          </Link>
          <Link to="/register" className="header-top-link">
            Register <i class="bi bi-person-fill"></i>
          </Link>
        </div>
: <div> <Link to="/login" onClick={()=>{ dispacth(setLogout())}} className="logout" > Logout</Link>
<div>
<Link  className="logout" onClick={()=>{navigate(-1)}}><i class="bi bi-skip-backward-fill"></i></Link>
</div>
</div>   }
      <div onClick={()=> setToggle(prev=>!prev)} className="header-menu">
        {toggle ?<i className="bi bi-x-lg"></i>: <i className="bi bi-list"></i>}
      </div>
    </header>
  );
};
export default Header;
/**
 * this an explaination how i work on header .. especially navbar in media query
 * here in list
 * 1.
 * if the toggle false make it true , else make the toggle the oppsite.. false
 * 2. while the nav become true thats mean the nav(menu) will open +the inside elememt will appear
 * and by using clip-path that's gonna work   link:(https://bennettfeely.com/clippy/)
 * inline style ..> nav bar then put the polygon(0 0, 100% 0, 100% 100%, 0 100%)
 * now need to make the element column style ..> navbar-links
 * 3.style in the css
 * 4. in step two we apear the element now need to hide it after clicking on any element <li onClick={()=>{setToggle(false)}} className="navbar-link">Category</li> this wil close the menu after clicking on any element
 */
/**
 * https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDg6PYnf1y2G8hfjkGRQBiLsCEQE7zsd_i7Q&usqp=CAU
 */