import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { setDonationOrder,deleteDonationOrder, updatDonationOrder,setMaterialDonation} from "../../redux/reducers/doner";
import axios from "axios";
 
 //===============================================================
const MaterialDonation = () => {
    const dispatch = useDispatch();
    const { donation } = useSelector((state) => {
      return {
        donation: state.donation.donation,
      };
    });
    const {token} = useSelector((state) => {
      return {
        token: state.auth.token,
      };
    });
      const [Message, setMessage] = useState("")
      const [newdate, setnewdate] = useState("")
      const [idupdate, setidupdate] = useState("")
      const [deleverydate, setDeleverydate] = useState("")
const [dontionthings, setdontionthings] = useState([])    
       //===============================================================
 const getmydonation = async () => {
  try {
    const result = await axios.get("http://localhost:5000/dontes/myDonition", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.success) {
    dispatch(setDonationOrder(result.data.result));
      setMessage("");
    } else throw Error;
  } catch (error) {
    if (error.response && error.response.data)  {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  }
};
 //==================================================================
        const getmyMatieraldonation = async () => {
          try {
            const result = await axios.get("http://localhost:5000/dontes/myDonition/material", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (result.data.success) {
              setdontionthings(result.data.cases)
              setMessage("");
            } else throw Error;
          } catch (error) {
            if (error.response && error.response.data)  {
              return setMessage(error.response.data.message);
            }
            setMessage("Error happened while Get Data, please try again");
          }
        };
        

   //===============================================================
   const handleupdatedate= async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/dontes/${id}`,{deleverydate:newdate})
      if (result.data.success) {
      dispatch(updatDonationOrder({id,newdate}));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data)  {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
    //===============================================================
 const handeldeleted = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:5000/dontes/${id}`)
    if (result.data.success) {
    dispatch(deleteDonationOrder(id));
      setMessage("");
    } else throw Error;
  } catch (error) {
    if (error.response && error.response.data)  {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  }
};
   //===============================================================


  useEffect(() => {
   getmydonation();
   getmyMatieraldonation()
  }, []);
   //===============================================================

  return (
    <>
    <div>Donation material</div>
    
    {dontionthings &&
       dontionthings.map((donate, i) => {
          return (
            <div>
              <p>Donation Category:{donate.title}</p>
            <p className="decshowcatigory"> Description: {donate.description}</p>
            <img src={donate.imgepathdoner}></img>
           <div><span> you can update Donation deadline Delivary</span><button onClick={()=>setidupdate(donate.id)}>update Date</button></div>
            {idupdate==donate.id?<div> <input
                    type="date"
                    onChange={(e) => {
                      setnewdate(e.target.value);
                    }}
                  ></input><button onClick={()=>{handleupdatedate(donate.id);setidupdate(
                    ''
                  )}}>take update</button></div>:""}
            <button onClick={()=>{handeldeleted(donate.id)}}> Remove from my list</button>
            </div>
          );
        })}
    </>
  )
}

export default MaterialDonation