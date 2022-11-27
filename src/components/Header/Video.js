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
        <section className='box_video'>
          <div>
            <video className='video_bg' src='https://res.cloudinary.com/dqsg0zf1r/video/upload/v1669150423/pexels-julia-m-cameron-6893879_cphdfi.mp4' autoPlay muted loop ></video>
            </div>
            <div className='video_info'>
            <h1>Fitrat Inasn</h1>
            <h3>A House Of Givivig & Power Generosity</h3>
            <Link to='/contact' className='box_video_Btn'>Contact Us</Link>
            </div>
        </section>
        </div>
    )
}
export default Video
 {/* <video src='https://res.cloudinary.com/dqsg0zf1r/video/upload/v1669210453/pexels-gustavo-fring-7100869_zt37zh.mp4' autoPlay muted loop ></video> */}

