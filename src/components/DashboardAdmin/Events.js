import React from "react";
import Sidebar from "./Sidebar";
import { useState, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MyContext } from "../../App";
import "./admin.css";
const Events = () => {
  const [date1, setDate1] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const { theme } = useContext(MyContext);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  //===============================================================

  const senInvitation = async () => {
   
    try {
      const result = await axios.post(
        `https://fetratinsandonationnewl.onrender.com/email/invitation`,
        {date:date1},
        {
          headers: { authorization: "Bearer " + token},
        }
      );
      if (result.data) {
        setStatus(true);
        setMessage("Invitation Sent");
        console.log(message)
        console.log('2222')
      } else {
        throw Error;
      }
    } catch (error) {
      //   if (!error.response.data.success)
      //   {
      //     setStatus(false);
      //     setMessage(error.response.data.message);
      //   }

      // }
      console.log(error.data);
    }
  };
  //===============================================================

  const sendthanks = async () => {
    try {
      const result = await axios.get(`https://fetratinsandonationnewl.onrender.com/email/thanks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data) {
        
        setStatus(true);
        setMessage("Email Sent");
        console.log(message)
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

  //===============================================================
  return (
    <>
      <div className={theme === "dark" ? "dark adminpanel" : "adminpanel"}>
        <div className="container_panel">
          <Sidebar />
          <div className="main_dashbored">
            <h1> Event Schedule</h1>
            <div className="latest_Case1">
              <p>
                If you would like to invite donors to the charity event, set a
                date
              </p>
              <div>
                <input
                  type="date"
                  required
                  className="input"
                  onChange={(e) => {
                    setDate1(e.target.value);
                  }}
                ></input>
                <button onClick={senInvitation} className="button">
                  {" "}
                  Send Invitation{" "}
                </button>
              </div>
              {status
                ? message && <div className="SuccessMessage">{message}</div>
                : message && <div className="ErrorMessage">{message}</div>}

              <p>If you would like to Send Email thanks to Month Doner</p>

              <button className="button" onClick={sendthanks}>
                Send thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
