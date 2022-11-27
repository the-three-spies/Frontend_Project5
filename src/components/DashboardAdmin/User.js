import React from 'react'
import Sidebar from './Sidebar';
import "./admin.css";
import { useState,useEffect,useContext} from 'react';
import { MyContext } from '../../App';
import axios from 'axios'
const User = () => {
const [user, setUser] = useState([])
const [message, setMessage] = useState("");
const [status, setStatus] = useState(false);
const {theme}=useContext(MyContext)
//===============================================================
const infoUser = async () => {
  try {
      const result = await (axios.get(`https://fetratinsandonationnewl.onrender.com/admin/user`
      ))
      if (result.data.success) {
          setUser(result.data.result)
          setStatus(true);
          setMessage("")
      }
      else { throw Error }
  }
  catch (error) {
    if (!error.response.data.success) {
      setStatus(false);
      setMessage(error.response.data.message);
    }

  }
}
//===============================================================
useEffect(() => {
infoUser()

}, [])
//===============================================================
  return (
    <>
<div className={theme==='dark'?'dark adminpanel':'adminpanel'}>
      <div className='container_panel'>
        <Sidebar/> 
        <div className='main_dashbored'>
        <h1> User at FitratInsan App</h1>  
        <div className='latest_Case'>
            <table>
                <tr> <th>First Name</th> <th> Last Name </th><th> Age</th> <th> city</th> <th> Email</th><th> Role</th> </tr>
                {
                    user && user.map((element, i) => {
                        return (
                            <tr key={i}><td>{element.firstname}</td> <td>{element.lastname}</td>
                                <td>{element.age}</td><td>{element.city}</td> 
                                <td> {element.email}</td> 
                                <td>{element.role} </td>
                            </tr>
                        )
                    })
                }
                
            </table>
            </div> 
            {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}    
      </div>
      </div>
      </div>
    </>
  )
}

export default User