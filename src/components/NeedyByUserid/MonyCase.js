import axios from "axios";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
// import "./style.css"
import './needyByUserId.css'
// import {
//   setNeedyCase,
//   addNeedyCase,
//   updateNeedyCase,
//   deleteNeedyCase,
//   updateActive
// } from "../../redux/reducers/Needy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//---------------- The Needy ----------------
const NeedyMonyByUserId = () => {
 // const dispatch = useDispatch();
 // const [description, setTitle] = useState("");
 // const [amount, setAmount] = useState("");
  //const [address, setAddress] = useState("");
 // const[things,setThings]=useState([])
  const[mony,setMony]=useState([])

  //useSelector
  // const { reduxaddnewneddy } = useSelector((state) => {
  //   return {
  //     reduxaddnewneddy: state.needy.needy,
  //   };
  // });
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  //---------------- Set The Needy ----------------

// const convertCaseUnactive=(id)=>{

// axios.put(`https://fetratinsandonationnewl.onrender.com/needycase/unactive/${id}`)
// .then((then)=>{
//   dispatch(updateActive(id))
// //console.log("hind")
// })
// .catch((err)=>{

// })


// }

  const deleteCase =(id)=>{

    axios.delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
    .then((then)=>{
    const arrayMony= mony.filter((elem)=>{
        return(elem.id!==id)
      })
      
    setMony(arrayMony)
    toast.success("Deleted successfully")
    })
    .catch((err)=>{
    
    })

  }


  // const deleteTingsCase =(id)=>{

  //   axios.delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
  //   .then((then)=>{
  //   const arrayTings= mony.filter((elem)=>{
  //       return(elem.id!=id)
  //     })
  //   setThings(arrayTings)
  //   })
  //   .catch((err)=>{
    
  //   })

  // }

  const gitMoneyCaseToUser=()=>{
  
    axios
      .get("https://fetratinsandonationnewl.onrender.com/needycase/monyCase", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result)=>{
        setMony(result.data.cases)
       // console.log(result)
      })
      .catch((err)=>{

        console.log(err)
      })
  }
  // const gitThingsCaseToUser=()=>{


  //   axios
  //     .get("https://fetratinsandonationnewl.onrender.com/needycase/thingCase", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((result)=>{
  //       setThings(result.data.cases)
  //      // console.log(result)
  //     })
  //     .catch((err)=>{

  //       console.log(err)
  //     })

  // }   
     

  useEffect(() => {
    gitMoneyCaseToUser()
   // gitThingsCaseToUser()
  }, []);
  //const navigate = useNavigate();
  //----------------DESIGIN return DESIGIN----------------
  return (
        <div  className="case_order_summery">
          <ToastContainer/>
          <h1>YOUR MONEY ORDER</h1>
          {/* <div className="caseorder-summery-title"> YOUR MONEY ORDER </div> */}
          <div className="newtestmoney" >
       {mony&&mony.map((element, i) => {
         return (
          
           <div key={`monydivshow${i}`} className="maiDivMonyTow">
                <div className="order_item">
                <p><span>{element.description}</span></p>
      <p><span>Amout</span> <span>${element.amount}</span></p>
      <hr></hr>
      <p><span>Rest</span> <span>${element.rest}</span></p>
      <hr></hr>
      <p><span>Donate Amout</span> <span>${element.donation_amount}</span></p>
      <hr></hr>
      <p><span> status</span> <span>{element.statusdonation}</span></p>
      <hr></hr>
      <p><span> </span> <span><button onClick={()=>{deleteCase(element.id)}}  ><i className="bi bi-trash-fill newbi-trash-fill"></i></button></span></p>
      
    </div>
   
    <div className="divImageMonynew   plus"><img alt="mon" src="https://res.cloudinary.com/ddsrkj1dx/image/upload/v1669291287/pic5_pyiqtz.png" ></img></div>
            
           </div>
          
         );
       })}
       </div>
     </div>
   );


  //----------------DESIGIN return DESIGIN----------------
  //---------------- return ----------------
  // return (
  //      <div  className="secandMmainMonyDispayCatigory">
  //     {mony&&mony.map((element, i) => {
  //       return (
  //         <div className="firstmone">
  //           <div >

  //            <img className="imgCategoryMomy"  src="./assets/images/pic5.png" alt="thinhimg"></img>
  //            </div>
  //            <div>
  //           <p><h1>Category:{element.title}</h1></p>

  //           <hr></hr>
  //           <p className="decshowcatigory"> <h4>Description:</h4> {element.description}</p>
  //           <p><h4>Amount:</h4>{element.amount}</p>
  //           <p><h4>Rest:</h4> {element.rest}</p>
           
  //           <p><h4>Donation Amount:</h4>{element.donation_amount}</p>
  //           <p>{element.statusdonation}</p>
  //           <button className="ptndeletCase" onClick={()=>{deleteCase(element.id)}}>Delete</button>
  //         </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default NeedyMonyByUserId