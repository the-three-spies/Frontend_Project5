import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setNeedyCase,
  addNeedyCase,
  updateNeedyCase,
  deleteNeedyCase,
} from "../../redux/reducers/Needy";
import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
// import { updateNeedyCase, deleteNeedyCase ,setNeedyId} from "../../redux/reducers/Needy";
//1.install
// npm i formik
//2. import
import { useFormik } from "formik";

//---------------- add Needy ----------------
const AddNeedy = ({ id }) => {
     const navigate = useNavigate();
  console.log("id", id);
  const dispatch = useDispatch();
  //useState
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [message, setMessage] = useState("");
  const [catogeyStatus,SetcatogeyStatus]=useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newAdress,setNewAdress]=useState("")
  const { reduxaddnewneddy } = useSelector((state) => {
    return {
      reduxaddnewneddy: state.needy.needy,
    };
  });

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  const { CategoryId } = useSelector((state) => {
    return {
      CategoryId: state.category.categoryId,
    };
  });
  const cat=()=>{
  CategoryId==3?SetcatogeyStatus(false):SetcatogeyStatus(true)
  }
  useEffect(()=>{
cat()
  },[])
  const API_endPoint=`https://api.openweathermap.org/data/2.5/weather?`
  const API_key="d75b0956686943dc457c3ea7fc57159e"


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)

      console.log("pos",position.coords)
    })
    let API_finalendpoint=`${API_endPoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
    console.log("kpoint",API_finalendpoint)
    axios.get(`${API_endPoint}lat=${latitude}&lon=${longitude}&appid=${API_key}&lang=${longitude}`).then((result)=>{
      console.log("m",result)
      setNewAdress(result.data.name)
      console.log("new",result.data.name)
      console.log("new",newAdress)
    }).catch((err)=>{
      console.log(err)
    })
   
  }, [latitude,longitude]);
  const AdderssfromGoogleLocation=()=>{
    setAddress(newAdress)
  }
  //---------------- handleNeedyCase ----------------
  const handleNeedyCase = async (e) => {
    
    console.log("CategoryId", CategoryId);
    console.log("asdfghjkl");
    //e.preventDefault();
    try {
      console.log("asdfghjkl");
      const result = await axios.post(
        "https://fetratinsandonationnewl.onrender.com/needycase",
        {
          description,
          category_id: CategoryId,
          amount,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (result.data.result) {
        console.log("hind");
        console.log(result.data.result);
       
        setMessage("Your Case has been created successfully");
        dispatch(addNeedyCase(result.data.result)); //{description,category_id,amout,address}
        if(result.data.result.category_id==3){
          navigate("/NeedyMonyByUserId")
        }
        else{
           navigate("/NeedyCaseById")
        }

        result.data.result.category_id==3?SetcatogeyStatus(false):SetcatogeyStatus(true)
        console.log(catogeyStatus)
        console.log("add,", reduxaddnewneddy);
      
      }
    } catch (error) {
      if (!error.response.data.success) {
        setMessage(error.response.data.message);
      }
    }
  };
//---------------- Delete Needy ----------------
  const handleDleteNeedy = () => {
    console.log("");
    axios
      .delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
      .then((result) => {
        console.log(result);
        dispatch(
          deleteNeedyCase({
            description,
            amount,
            address,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //--------------------------------------
  //   useEffect(() => {
  //     if (!setLogin) {
  //         navigate("/dashbord");
  //     }
  //   });
  //---------------- return ----------------
  //description~~>text  category_id~~>num  amout~~>number  address~~>text
  return (
    <div>
     
    {catogeyStatus?
    <div className=" mainShow donationDeveveyThing ">
    
    
    <div className="mainShow"> 
{/*  */}



        
   


        {/* <div className="of"> */}
          <h1>Add a New Needy Order</h1>
      
      
          <label>
                <b>Address</b>
              </label>
              <br></br>
              <input className="spicalityinput"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                placeholder="Enter you Address"
                value={address}
                required
              ></input>
              <br></br>
      
      <label>
                <b> Description</b>
              </label>
              <br></br>
              <textarea className="Description"  rows={5}
               
      
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="input"
                placeholder="Enter medical Description"
                
                required
              ></textarea>
         <br></br>
         <button className="adddonationDEveyThingBtn" onClick={handleNeedyCase}>create</button>
         <button onClick={ AdderssfromGoogleLocation} className="adddonationDEveyThingBtn" >Adress From Google</button>
{/* </div> */}



{/*  */}
    </div>
    <div>
    <img
          className="imganotherCategory"
          src="https://img.freepik.com/free-vector/flat-ramadan-charity-background-with-muslim-people-giving-money-food-hungry-homeless-illustration_1284-61988.jpg?w=740&t=st=1668002902~exp=1668003502~hmac=46f23104694f5994698ad99f55eeec7f5b19e601fd1b6d1ecb607adf1e598bee"
          alt="pic"
        ></img>

    </div>
    </div>
      :<div className="mainShow">
       <div className="mainShow">
          <h1>Add a New Needy Order</h1>
      
      
      <label>
            <b>Amount</b>
          </label>
          <br></br>
        <input className="spicalityinput"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
                placeholder="Enter you Amount you need"
                
                required
              ></input>
      <textarea className="Description"

        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br></br>
      <button className="adddonationDEveyThingBtn" onClick={handleNeedyCase}>create</button>
     
      {message}
      </div>
      <div>
<img src="https://img.freepik.com/free-vector/people-carrying-donation-charity-related-icons_53876-43091.jpg" className="imganotherCategory"></img>

      </div>
     </div>
     
    }
    
    </div>
  );
};
export default AddNeedy;
