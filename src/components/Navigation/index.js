import React from 'react'
import { useSelector, } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import { BsPersonCircle,BsFillEnvelopeFill,BsLightbulbFill,BsLightbulbOffFill} from 'react-icons/bs'
import {RiUserShared2Fill}from 'react-icons/ri'
import {ImClock} from 'react-icons/im'
import "./style.css";

  //===============================================================

const Navigation = () => {
    const {stateRole} = useSelector((state) => {
        return {
            stateRole: state.auth.stateRole,
        };
      });
      const {token} = useSelector((state) => {
        return {
          token: state.auth.token,
        };
      });
      const navigate=useNavigate()
      //===============================================================

  return (
    <>
      {/* {stateRole=='1'?"":<div className="header_top">
        <div className="icon-left">
         <span><ImClock/> 24/24 Sunday-Thursday</span> 
        
        </div>
        <div className="icon-right">
         <span> <BsFillEnvelopeFill/>fitratinsancommunity@gmail.com</span>
         <span><BsLightbulbFill/></span>
       <span><BsLightbulbOffFill/></span>
        </div>
      </div>}

      {stateRole!=='1'?<div className="header2">
    <div><img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668471086/fitrat_Insan_1_egi4bg.png"></img></div>
    <div className="linkhome">
      <Link to="/home"> Home</Link> 
     <Link to="/about"> Our Story </Link> 
   <Link to="/team">FAQs</Link>
   <Link to="/team">Contact us </Link>
     <Link to="/login"> login <BsPersonCircle/></Link> 
</div>
   </div>:""} */}
   {
    stateRole==3? <div className="headerneedy">
    <Link to="/donate" className="navbar-link"> Donate Now</Link> 
   <Link to="/mythingdonation" className="navbar-link"> My in-kind donations</Link> 
 <Link to="/mymonydonation" className="navbar-link">My cash donations</Link>
 <Link to="/myChat" className="navbar-link">Chat</Link>

 </div>:""
   }

  
  


</>    
)
}

export default Navigation