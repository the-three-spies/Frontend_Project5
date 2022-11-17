import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { setDonationOrder,deleteDonationOrder, updatDonationOrder,setMaterialDonation} from "../../redux/reducers/doner";
import axios from "axios";
 
 //===============================================================
const MoneyDonationList = () => {
  const dispatch = useDispatch();
  // const { donation } = useSelector((state) => {
  //   return {
  //     donation: state.donation.donation,
  //   };
  // });
  const {token} = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
    const [Message, setMessage] = useState("");
    const [moneyDonation, setmoneyDonation] = useState([])
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
    const getmyMoneyonation = async () => {
      try {
        const result = await axios.get("http://localhost:5000/dontes/myDonition/money", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data.success) {
          setmoneyDonation(result.data.cases)
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
      getmydonation()
      getmyMoneyonation();
          }, [])
            
    
//===============================================================
  return (
    <>
    <div>Donation</div>
    
    {moneyDonation &&
     moneyDonation.map((donate, i) => {
        return (
          <div>
            <p>Donation Category:{donate.title}</p>
          <p> Description: {donate.description}</p>
          <p>Amount donation:{donate.amount}</p>
          <button onClick={()=>{handeldeleted(donate.id)}}> Remove from my list</button>
          </div>
        );
      })}
      </>
  )
}

export default MoneyDonationList