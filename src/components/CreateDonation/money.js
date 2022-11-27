import React from 'react'
import { Navigate, useNavigate,Link,useParams } from "react-router-dom";
// import "./style.css";
import "./createDonation.css"
import { useDispatch, useSelector } from "react-redux";
import { addDonationMoneyOrder, addDonationOrder } from "../../redux/reducers/doner";
import Navigation from '../Navigation';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Money = () => {
  const imagecase=['https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/per4-removebg-preview_qa2wku.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/pers3-removebg-preview_sm4ph8.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669150185/person1-removebg-preview_yoheca.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669150533/222-removebg-preview_wmxvoj.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669162717/person333-removebg-preview_wuqmsz.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/per333-removebg-preview_n5joia.png']
  const [needCase, setneedCase] = useState([]);
  const params = useParams();
  const [amount, setamount] = useState(0)
  const [case_id, setcase_id] = useState(null);
  const [description, setdescription] = useState("")
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [clickon, setclickon] = useState("")
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [toasboolean,setTtoasboolean]=useState(false)
  const {token} = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  // const {cateagory}=useSelector((state) => {
  //   return {
  //     cateagory: state.donation.cateagory,
  //   };
  // });
  const cateagory = params.id;

      //===============================================================

  const getallNeedCase = async (id) => {
    try {
      const result = await axios.get(
        `https://fetratinsandonationnewl.onrender.com/needycase/needyCategory/${id}`
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
      category_id:cateagory
    };
    try {
      const result = await axios.post(
        `https://fetratinsandonationnewl.onrender.com/dontes`,information,
    
        {
          headers: { authorization: "Bearer " + token },
        }
      );
  

      if (result.data.success) {
        toast.success("thank you form our hearts , the process of donation done")
        setTtoasboolean(true)
        // setStatus(true);
        // setMessage("thank you form our hearts , the process of donation done");
        dispatch(addDonationMoneyOrder(result.data.result))
        const myTimeout = setTimeout(()=>{navigate("/mymonydonation")}, 500);
      } else {
        throw Error;
      }
    } catch (error) {
      // if (!error.response.data.success) {
      //   // setStatus(false);
      //   setMessage(error.response.data.message);
      // }
      console.log(error)
    }
  };
  useEffect(() => {
  getallNeedCase(cateagory)
  
    
  }, [])
  //.................. return Desigin return .....................
    return (<div className='container_donate'>
       {/* <Navigation/> */}
       {/* <h1>Money form Donation</h1> */}
      {/* mapopen */}
      <ToastContainer/>

      <div className='map'>
        
        {needCase && needCase.map((need,i)=>{
          // console.log("needycase",needCase)
          return (
            <div  key={i} className='card_forDonate'>
            <div className='img_donate'>
              <img src={imagecase[i]}></img>
            </div>
            <div className='infocard_donate'>
              <div className='details'>
                <h2><span>{need.description}</span></h2>
                <div className='data_donate'>
                  <h3>{need.amount}<br/><span>Amout</span></h3>
                  <h3>{need.donation_amount}<br/><span>Dnoation</span></h3>
                  <h3>{need.rest}<br/><span>Remaining</span></h3>
                </div>
                <div className='chosecasebtn_donate'>
                  <button className={clickon==need.id?'true':""}
              onClick={() => {
                setcase_id(need.id);
                setclickon(need.id)
              }}>Choose</button>
              <button>Message</button>
                  {/* <button><Link to="/NewSoct">Message</Link></button> */}
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
      {/* map close */}
      {/* start donate payment*/}
      <div className='part22' >
        <div className='cardpt2_forDonate'>
        <div className='details_box'>
        </div>
      <div className='info_donate'><label>The Amout</label>
      <input className="placeMaterial bgplacehoder" type="number" placeholder="$" min="1" max="50" required onChange={(e)=>{setamount(e.target.value)}}/></div>
          <div className='info_donate'>
          <label>Message</label><input className='change placeMaterial bgplacehoder' type="text" placeholder=" your message"onChange={(e)=>{setdescription(e.target.value)}}/> </div>
          <div className='chosecasebtn2_donate'><button className={toasboolean === false ? "send-btn" : "newsend-btn"} onClick={handelDonate}> Donate Now</button></div>
          
          {/* {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>} */}
      </div>
      </div>
 {/* End donate payment */}
    </div>)
  //.................. return Desigin return .....................
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

{/* <div className="img_donat">
<img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668431477/vecteezy_donation-awareness-illustration-01_gb1120_zpkumh.jpg"></img>
</div> */}