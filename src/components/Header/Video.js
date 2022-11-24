import './video.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";

const Video =()=>{
    const [showLoginLogout, setShowLoginLogout] = useState(false);
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
    return(
        <div className='video_Container'>
        {/* <header className='video_header'>
            <h2><Link to='/home' className='video_logo_link'>Fitrat Insan</Link></h2>
            <ul className='video_ul_nav'>
                <li><Link to="/contact" className='video_li_nav'>Contact</Link ></li>
                <li><Link to="/about" className='video_li_nav'>About</Link></li>
                <li><Link to="/ourStory" className='video_li_nav'>Our Story</Link></li>
                <li><Link to="/FAQs" className='video_li_nav'>FAQs</Link></li>
                <li><Link to="/ApiPag" className='video_li_nav'>Buy</Link></li>
                {!isLoggedIn ?
    <div className="header-top-links-inout">
        <Link to="/login" className='video_li_nav pluss'>
          Login
        </Link>
        <Link to="/register" className='video_li_nav'>
          Register
        </Link>
      </div>
: <div> <Link to="/login" className='video_li_nav' onClick={()=>{ dispacth(setLogout())}} > Logout</Link></div>}
            </ul>
        </header> */}
        <section className='box_video'>
         
            <video src='https://res.cloudinary.com/dqsg0zf1r/video/upload/v1669150423/pexels-julia-m-cameron-6893879_cphdfi.mp4' autoPlay muted loop ></video>
            {/* <video src='https://res.cloudinary.com/dqsg0zf1r/video/upload/v1669210453/pexels-gustavo-fring-7100869_zt37zh.mp4' autoPlay muted loop ></video> */}
            <h1>Fitrat Inasn</h1>
            <h3>A House Of Givivig & Power Generosity</h3>
            <Link to='/contact' className='box_video_Btn'>Contact Us</Link>
            
        </section>
        </div>
    )
}
export default Video
//autoplay muted loop plays-Inline 


