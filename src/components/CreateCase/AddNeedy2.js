import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addNeedy2.css";
// import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
 // setNeedyCase,
  addNeedyCase,
 // updateNeedyCase,
  deleteNeedyCase,
} from "../../redux/reducers/Needy";
//import { setLogin, setUserId, setLogout } from "../../redux/reducers/auth";
//import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//---------------- add Needy ----------------
const AddNeedy2 = ({ id }) => {
  const navigate = useNavigate();
  //console.log("id", id);
  const dispatch = useDispatch();
  //useState
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  //const [category_id, setCategory_id] = useState("");
  const [message, setMessage] = useState("");
  const [catogeyStatus, SetcatogeyStatus] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newAdress,setNewAdress]=useState("")
  //useSelector
  const [toasboolean,setTtoasboolean]=useState(false)
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
  const { CategoryId } = useSelector((state) => {
    return {
      CategoryId: state.category.categoryId,
    };
  });
  const cat = () => {
    CategoryId == 3 ? SetcatogeyStatus(false) : SetcatogeyStatus(true);
  };
  useEffect(() => {
    cat();
  }, []);

  const API_endPoint=`https://api.openweathermap.org/data/2.5/weather?`
  const API_key="d75b0956686943dc457c3ea7fc57159e"


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)

     // console.log("pos",position.coords)
    })
    let API_finalendpoint=`${API_endPoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
   // console.log("kpoint",API_finalendpoint)
    axios.get(`${API_endPoint}lat=${latitude}&lon=${longitude}&appid=${API_key}&lang=${longitude}`).then((result)=>{
    //  console.log("m",result)
      setNewAdress(result.data.name)
    //  console.log("new",result.data.name)
     // console.log("new",newAdress)
    }).catch((err)=>{
      console.log(err)
    })
   
  }, [latitude,longitude]);
  const AdderssfromGoogleLocation=()=>{
    setAddress(newAdress)
  }
  //---------------- handleNeedyCase ----------------
  const handleNeedyCase = async (e) => {
    e.preventDefault();
    if(CategoryId===3){
    if(!amount){return toast.error("Amount is requier")}}
    try {
      //console.log("asdfghjkl");
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
        //console.log("hind");
        //console.log(result.data.result);
        toast.success("Your Case has been created successfully")
        setTtoasboolean(true)
       // setMessage("Your Case has been created successfully");
        dispatch(addNeedyCase(result.data.result));
        if (result.data.result.category_id == 3) {
          const myTimeout = setTimeout(()=>{navigate("/NeedyMonyByUserId")}, 500);
        } else {
          const myTimeout = setTimeout(()=>{navigate("/NeedyCaseById")}, 300);
        }
        result.data.result.category_id == 3
          ? SetcatogeyStatus(false)
          : SetcatogeyStatus(true);
       // console.log(catogeyStatus);
       // console.log("add,", reduxaddnewneddy);
      }
    } catch (error) {
      if (!error.response.data.success) {
        setMessage(error.response.data.message);
      }
    }
  };
  //---------------- Delete Needy ----------------
  const handleDleteNeedy = () => {
   // console.log("");
    axios
      .delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
      .then((result) => {
       // console.log(result);
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
  //------------------return-----------------------
  return(<div className="ourNeedyCase-body">
    <ToastContainer/>
    {catogeyStatus ?( <div className="ourNeedyCase-section">
        <div className="ourNeedyCase-inner-container">
      
      {/* <h2>And we will hear you</h2> */}
      <form className="add_needy_form" action="" method="post">
      <h2 className="needycase_hesder add_needy_form">post here what you need</h2>
        <input type="text_add_needy" name="name" className="text_box_add_needy" value={address}
 placeholder="Your Adress" onChange={(e) => {
                setAddress(e.target.value);
              }}   required/>
        <textarea name="message" rows="5" placeholder="description your case" onChange={(e) => {
                setDescription(e.target.value);
              }} required></textarea>
                      <imput type="" name="" className="send-btn " value="send" onClick={ AdderssfromGoogleLocation}>Your location through Google Map</imput>
        <input type="submit" name="submit"  className={toasboolean === false ? "send-btn gnfgfgh" : "newsend-btn newgnfgfgh"} value="Create"  onClick={handleNeedyCase}/> 

      </form>
    </div>
    </div>):(<div className="ourNeedyCase-section">
    <div className="ourNeedyCase-inner-container">
        <div className="add_needy_form">
      <h2 className="needycase_hesder">post here what you need</h2>
      {/* <h2>And we will hear you</h2> */}
      <form className="add_needy" action="" method="post">
        <input type="number" name="name" min={1} className="text_box_add_needy" placeholder="The amout" onChange={(e) => {
                setAmount(e.target.value);
              }}   required/>
        <textarea name="message" rows="5" placeholder="description your case" onChange={(e) => {
                setDescription(e.target.value);
              }} required></textarea>
        <input type="submit" name="submit" className={toasboolean === false ? "send-btn" : "newsend-btn"} value="Create"  onClick={handleNeedyCase}/>.
         {message}
      </form>
    </div>
    </div>
    </div>
    )}

  </div>)
};
export default AddNeedy2;
