import React from 'react'
import Sidebar from './Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import "./style.css";
const Events = () => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  //===============================================================

  const senInvitation = async () => {
  try {
    const result = await axios.post(
      `http://localhost:5000/email/invitation`,date,{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    if (result.data.success) {
      setStatus(true);
      setMessage("Invitation Sent");
    } else {
      throw Error;
    }
  } catch (error) {
    if (!error.response.data.success) 
    {
      setStatus(false);
      setMessage(error.response.data.message);
    }
  
  }
    
  }
  //===============================================================

  const sendthanks = async () => {
    try {
      const result = await axios.post(
        `http://localhost:5000/email/thanks`,date,{
          headers: {
            Authorization: `Bearer ${token}`,
          }});
      if (result.data.success) {
        setStatus(true);
        setMessage("Email Sent");
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) 
      {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    
    }
      
    }

//===============================================================
  return (
    <>
      <div className='admin_panal'>
        <div className='container_panel'>
          <Sidebar />
          <div className='main_dashbored'>
            <h1> Event Schedule</h1>
            <div className='latest_Case1'>
          <p>If you would like to invite donors to the charity event, set a date</p>
             <div><input type="date" required className='input' onChange={(e) => {
                setDate(e.target.value)
              }}></input>
        <button onClick={senInvitation} className='button'> Send Invitation </button></div> 
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
            
          <p>If you would like to  Send Email thanks to  Month Doner</p>
  
           <button className='button'>Send thanks</button>

           </div>
            </div>  
        </div>
      </div>
    </>
  )
}

export default Events