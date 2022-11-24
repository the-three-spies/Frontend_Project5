import React from 'react'
import Sidebar from './Sidebar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import "./needy.css";
import { FaSearch } from 'react-icons/fa';
const NeedyCase = () => {
  const [needyCase, setneedyCase] = useState([])
  const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);  const [search, setsearch] = useState("")
      //===============================================================

      const allNeedyCase = async () => {
        try {
            const result = await (axios.get(`http://localhost:5000/needycase`
            ))
            if (result.data.success) {
               setneedyCase(result.data.result)
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
    const searchInCase = async () => {

      try {
        const result = await axios.get(`http://localhost:5000/admin/search_2?name=${search}`);
        if (result.data.success) {
setneedyCase(result.data.result)  
 setStatus(true);
setMessage("")
  
        } else {
          throw Error;
        }
      } catch (error) {
        if (!error.response.data.success) {
          setStatus(false);
          setMessage(error.response.data.message);
        }
      }
    }
    //===============================================================
    
    useEffect(() => {
   
allNeedyCase()

    }, [])
    //===============================================================
  return (
  <>
  <div className='admin_panal'>
      <div className='container_panel'>
        <Sidebar/>  
        <div className='main_dashbored'>
        <h1> All Needy Cases</h1>
        <div className="search">
        <input type="text" width="40" placeholder="search" onChange={(e) => { setsearch(e.target.value) }}></input>
        <button onClick={searchInCase} ><FaSearch /></button>
        </div>
        <div className='latest_Case'>
            <table>
                <tr> <th>user Name</th> <th>Help Order </th><th> Name of Section </th> <th> Status of Order</th> <th> Amount Needed</th><th> Amount Donation</th> <th> Address</th> </tr>
                {
                    needyCase && needyCase.map((element, i) => {
                        return (
                            <tr key={i}><td>{element.firstname}</td> <td>{element.description}</td>
                                <td>{element.title}</td><td>{element.statusdonation}</td> <td> {element.amount=='null'?'--':element.amount}</td>
                                <td> {element.donation_amount}</td> 
                                <td>{element.address} </td>
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

export default NeedyCase