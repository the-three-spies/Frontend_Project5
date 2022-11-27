import axios from "axios";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import "./style.css";
//import {
 // setNeedyCase,
  //addNeedyCase,
 // updateNeedyCase,
 // deleteNeedyCase,
 // updateActive,
//} from "../../redux/reducers/Needy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//---------------- The Needy ----------------
const NeedyByUserId = () => {
 // const dispatch = useDispatch();
  // const [description, setTitle] = useState("");
  // const [amount, setAmount] = useState("");
  // const [address, setAddress] = useState("");
  const [things, setThings] = useState([]);
 // const [mony, setMony] = useState([]);
  const [toasboolean,setTtoasboolean]=useState(false)
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

  // const convertCaseUnactive = (id) => {
  //   axios
  //     .put(`https://fetratinsandonationnewl.onrender.com/needycase/unactive/${id}`)
  //     .then((then) => {
  //       dispatch(updateActive(id));
  //      // console.log("hind");
  //     })
  //     .catch((err) => {});
  // };

  // const deleteCase =(id)=>{

  //   axios.delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
  //   .then((then)=>{
  //   const arrayMony= mony.filter((elem)=>{
  //       return(elem.id!==id)
  //     })
  //   setMony(arrayMony)
  //   })
  //   .catch((err)=>{

  //   })

  // }

  const deleteTingsCase = (id) => {
    axios
      .delete(`https://fetratinsandonationnewl.onrender.com/needycase/${id}`)
      .then((then) => {
        toast.success("Deleted successfully")
        setTtoasboolean(true)
        const arrayTings = things.filter((elem) => {
          return elem.id !== id;
        });
        setThings(arrayTings);
      })
      .catch((err) => {});
  };

  // const gitMoneyCaseToUser = () => {
  //   axios
  //     .get("https://fetratinsandonationnewl.onrender.com/needycase/monyCase", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((result) => {
  //       setMony(result.data.cases);
  //      // console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const gitThingsCaseToUser = () => {
    axios
      .get("https://fetratinsandonationnewl.onrender.com/needycase/thingCase", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setThings(result.data.cases);
       // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 // const diplayMoneyCaseToUser = () => {
    //   axios
    //       .get("https://fetratinsandonationnewl.onrender.com/needycase/myCase", {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((result) => {
    //         console.log("set result", result.data.cases);
    //         // result.data.cases.title==mony?setMony.push(result.data.cases):setThings.push(result.data.cases)
    //        dispatch(setNeedyCase(result.data.cases));
    //         result.data.cases&&  result.data.cases.map((elm,i)=>{
    // if(elm.title==="money"){
    //  mony.push(elm)
    // }else{
    //   things.push(elm)
    //   console.log("result.data.cases",result.data.cases[0].title)
    // }
    // })
    //         console.log("mony",mony)
    //         console.log("things",things)
    //         console.log("get", reduxaddnewneddy);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
 // };
 // const diplayTingsCaseToUser = () => {};

  useEffect(() => {
   // gitMoneyCaseToUser();
    gitThingsCaseToUser();
   // diplayMoneyCaseToUser();
  }, []);
  //const navigate = useNavigate();
  //----------------DESIGIN return DESIGIN----------------
  return (
    <div className="case_order_summery">
      <ToastContainer/>
      <h1>YOUR MATERIAL ORDER</h1>
      {/* <div className="caseorder-summery-title"> YOUR MONEY ORDER </div> */}
      <div className="newtestmoney" >
      {things &&
        things?.map((element, i) => {
          return (
            <div key={`maiDivMonyTow${i}`} className="maiDivMonyTow">
              
              <div class="order_item">
              <p><span>{element.description}</span></p>
                <p>
                  <span>Category</span> <span>{element.title}</span>
                </p>
                <hr></hr>
                <p>
                  <span>Donation Status :</span>{" "}
                  <span>{element.statusdonation}</span>
                </p>
                <hr></hr>
                <p>
                  <span>Adress</span> <span>{element.address}</span>
                </p>
                <hr></hr>
                <p>
                  <span> </span>{" "}
                  <span>
                    <button
                      onClick={() => {
                        deleteTingsCase(element.id);
                      }}
                    >
                      <i className={toasboolean === false ? "bi bi-trash-fill" : "bi bi-trash-fill newbi-trash-fill"} ></i>
                    </button>
                  </span>
                </p>
              </div>
              <div className="divImageMonynew1">
                <img className="imgstyle" alt="thi" src="https://res.cloudinary.com/ddsrkj1dx/image/upload/v1669296734/d4_n8dezw.png"></img>
              </div>
            </div>
          );
        })}</div>
    </div>
  );
  //----------------DESIGIN return DESIGIN----------------
  //---------------- return ----------------
  // return (

  //     <div className="secandMmainMonyDispayCatigory">

  //     {things&& things?.map((element, i) => {
  //       return (

  //         <div className="firstthings">

  //           <div>
  //          <img className="imgCategory" src="./assets/images/pic4.png"></img>
  //          </div>
  //          <div>
  //          <p> <h1>Category:{element.title}</h1>
  //          </p>
  //          <hr></hr>
  //           <p className="decshowcatigory"> <h4>Description:</h4> {element.description}</p>

  //           <p><h4>Status Donation:</h4> {element.statusdonation}</p>
  //           <p><h4>Address:</h4>{element.address}</p>
  //           <button className="ptndeletCase" onClick={()=>{deleteTingsCase(element.id)}} >Delete</button>
  //           </div>
  //         </div>
  //       );
  //     })}
  //     </div>

  // );
};

export default NeedyByUserId;
