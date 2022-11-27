
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
// import HeaderTop from "./headerTop";
const NavbarNew = () => {
  //------------------------------------- here will make navbar and logo
  //navigate
  const navigate = useNavigate();
  //useState
  const [toggle, setToggle] = useState(false);
  //useSelector
  //------------- search bar -------------
  const search = () => {};
  //------------- return -------------
  return ( //1.header //2.navbar //3.change the nav to list menu for resopnsive desigin
    <header className="headerneedy">
  



      <nav style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
        <ul className="navbar-links">
        
        <Link to="/Showcategories" className="navbar-link-needy" onClick={()=>{setToggle(false)}}>Category</Link>
        <Link to="/NeedyCaseById" className="navbar-link-needy" onClick={()=>{setToggle(false)}}>Material</Link>
        <Link to="/NeedyMonyByUserId" className="navbar-link-needy" onClick={()=>{setToggle(false)}}>Money</Link>
        <Link to="/newSoct" className="navbar-link-needy" onClick={()=>{setToggle(false)}}>Send Message </Link>
        
          {/* <li onClick={()=>{setToggle(false)}} className="navbar-link">FAQs</li> */}
        </ul>
      </nav>
      
    </header>
  );
};

export default NavbarNew;

