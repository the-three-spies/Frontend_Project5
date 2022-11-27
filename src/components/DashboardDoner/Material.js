import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {deletethingOrder, setDonationThing,updatDonationThingOrder,
} from "../../redux/reducers/doner";
import axios from "axios";
import './materialDoner.css'
//===============================================================
const MaterialDonation = () => {
  const dispatch = useDispatch();
  const {dontionthings } = useSelector((state) => {
    return {
      dontionthings: state.donation.dontionthings,
    };
  });
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const [Message, setMessage] = useState("");
  const [newdate, setnewdate] = useState("");
  const [idupdate, setidupdate] = useState("");
  // const [deleverydate, setDeleverydate] = useState("");
  // const [dontionthings, setdontionthings] = useState([]);
  //===============================================================
  // const getmydonation = async () => {
  //   try {
  //     const result = await axios.get(
  //       "https://fetratinsandonationnewl.onrender.com/dontes/myDonition",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (result.data.success) {
  //       dispatch(setDonationOrder(result.data.result));
  //       setMessage("");
  //     } else throw Error;
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       return setMessage(error.response.data.message);
  //     }
  //     setMessage("Error happened while Get Data, please try again");
  //   }
  // };
  //==================================================================
  const getmyMatieraldonation = async () => {
    try {
      const result = await axios.get(
        "https://fetratinsandonationnewl.onrender.com/dontes/myDonition/material",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        dispatch(setDonationThing(result.data.cases));
        // console.log(result.data.cases);
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================
  const handleupdatedate = async (id) => {
    try {
      const result = await axios.put(`https://fetratinsandonationnewl.onrender.com/dontes/${id}`, {
        deleveryDate: newdate,
      });
      if (result.data.success) {
      
        dispatch(updatDonationThingOrder({id,newdate}))
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================
  const handeldeleted = async (id) => {
    try {
      const result = await axios.delete(`https://fetratinsandonationnewl.onrender.com/dontes/${id}`);
      if (result.data.success) {
        dispatch(deletethingOrder(id))
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  useEffect(() => {
    // getmydonation();
    getmyMatieraldonation();
  }, []);
  //===============================================================
  //------------------Start return desigin-------------------------
  return( <div className="donate_MaterialOrder_summery" >
  <h1>Your Material Donation List</h1>
  <div className="mmaapp">
    {dontionthings && dontionthings.map((donate,i)=>{
      return(
        <div key={i} >
        <div className="material_box">
                              <button onClick={() => setidupdate(donate.id)}  className="edit_donate" >
                    {" "}
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      handeldeleted(donate.id);
                    }}
                    className="delete_donate"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
        <img src={donate.imgepathdoner} className="img_donate_img"></img>
        {/* <h3>${donate.deleveryDate}</h3> */}
        <p>Dilevery time:{donate.deleverydate}</p>  
        
        <p>{donate.description}</p>
        {idupdate == donate.id ? (
                <div class="info_donate">
                  <input
                    type="date"
                    onChange={(e) => {
                      setnewdate(e.target.value);
                    }}
                  ></input>
                  <button
                  className="udateDatedonate"
                    onClick={() => {
                      handleupdatedate(donate.id);
                      setidupdate("");
                    }}
                  >
                    edit
                  </button>
                </div>
              ) : (
                ""
              )}
        </div>
        </div>
      )
    })}
  </div>
</div>)
  //------------------End return desigin-------------------------
  return (
    <>
      <div>Donation material</div>

      {dontionthings &&
        dontionthings.map((donate, i) => {
          return (
            <div>
              <p>Donation Category:{donate.title}</p>
              <p className="decshowcatigory">
                {" "}
                Description: {donate.description}
              </p>
              <img src={donate.imgepathdoner}></img>
              <p>Dilevery time:{donate.deleverydate}</p>  
              {/* **** */}
              <p> you can update Donation deadline </p>
              <button onClick={() => setidupdate(donate.id)}>
                update donation
              </button>
              {idupdate == donate.id ? (
                <div>
                  <input
                    type="date"
                    onChange={(e) => {
                      setnewdate(e.target.value);
                    }}
                  ></input>
                  <button
                    onClick={() => {
                      handleupdatedate(donate.id);
                      setidupdate("");
                    }}
                  >
                    take update
                  </button>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  handeldeleted(donate.id);
                }}
              >
                {" "}
                Remove from my list
              </button>
            </div>
          );
        })}
    </>
  );
};

export default MaterialDonation;
