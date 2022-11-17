import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addDonationOrder } from "../../redux/reducers/doner";
import Navigation from '../Navigation';
import axios from 'axios';
import { useState,useEffect } from 'react';
const Money = () => {
  const imagecase=['https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/person2_peh2ws.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668431004/per4_lx4ufh.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/person333_bqjeif.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/pers3_op46c2.png']
  const [needCase, setneedCase] = useState([]);
  const [amount, setamount] = useState(0)
  const [case_id, setcase_id] = useState(null);
  const [description, setdescription] = useState("")
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [clickon, setclickon] = useState("")
  const dispatch = useDispatch();
  const {token} = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const {cateagory}=useSelector((state) => {
    return {
      cateagory: state.donation.cateagory,
    };
  });
      //===============================================================

  const getallNeedCase = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/needycase/needyCategory/${id}`
      );

      if (result.data.success) {
        setneedCase(result.data.cases);
    
      } else {
        throw Error;
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
      //===============================================================

  const handelDonate = async () => {
    let information = {
      amount,
      description,
      address:null,
      case_id,
      deleveryDate:null,
      imgePathDoner:null,
      category_id:cateagory.id
    };
    try {
      const result = await axios.post(
        `http://localhost:5000/dontes`,information,
    
        {
          headers: { authorization: "Bearer " + token },
        }
      );
  

      if (result.data.success) {
        setStatus(true);
        setMessage("thank you form our heart , the process of donation done");
        dispatch(addDonationOrder(result.data.result))
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };
  useEffect(() => {
  getallNeedCase(cateagory.id)
  
    
  }, [])
        //===============================================================

  return (
    <>
        <Navigation/>

    <h1>Money form Donation</h1>
      <div className="container-donate">
       <div className="adddonate">
        <div  className='case_needy'>
   {needCase && needCase.map((need, i) => {
        return (
          <div>
            <p>case :{need.description}</p>
            <img src={imagecase[i]} className='img_case'></img>
            <p>amount Required:{need.amount}</p>
            <p>amount donation:{need.donation_amount}</p>
            <p>Remaining amount:{need.rest}</p>
            <button className={clickon==need.id?'true':""}
              onClick={() => {
                setcase_id(need.id);
                setclickon(need.id)
              }}
            > choose Case
            </button> </div> )})}
            </div>

    <div className='info_donate'><label>input you money would you donation</label> <input type="number" placeholder="$" min="1" max="50"  onChange={(e)=>{setamount(e.target.value)}}/></div>
    <div>
    <label>write a message if you wante about you dination</label><input type="text" placeholder=" your message about your donation"onChange={(e)=>{setdescription(e.target.value)}}/> </div>
    <div><button className="button" onClick={handelDonate}> Donate Now</button></div>
    
    {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
       

        </div>
        <div className="img_donat">
          <img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668431477/vecteezy_donation-awareness-illustration-01_gb1120_zpkumh.jpg"></img>
        </div>
        </div>
            </>
  )

}

export default Money