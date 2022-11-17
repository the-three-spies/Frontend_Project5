// import React, { useState, useEffect } from "react";
// // import io from socket.io-client"
// import { io } from "socket.io-client";
// // get the endpoint url from the .env file
// const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

// function NewSoct() {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState();
//   // connect to the server, the connection can be made in a separate file (context, redux, exported) and used here
//   const socket = io.connect(ENDPOINT);

//   const sendMessage = () => {
//     // emit a `message` event with the value of the message
//     socket.emit("message", message);
//   };

//   useEffect(() => {
//     // add a an event listener on message events
//     socket.on("message", (data) => {
//       setMessages((messages) => [...messages, data]);
//     });

//     // remove all listeners on clean up
//     return () => socket.removeAllListeners();
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send </button>
//       {messages.map((message, index) => {
//         return <div key={index}> {message} </div>;
//       })}
//     </div>
//   );
// }

// export default NewSoct;


import "./Socket.css"

import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//const socket = io.connect("http://localhost:3001");
const socket = io("http://localhost:3001",{autoConnect:false});
function NewSoct() {
  const {auth ,userId,token,stateRole,userName }= useSelector((state) => {
    return {
      auth: state.auth.isLoggedIn,
      userId: state.auth.userId,
      token: state.auth.token,
      userName:state.auth.userName,
      stateRole:state.auth.stateRole,
    };
  });
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [messagesend, setMessageSend] = useState("");
  const [info, setInfo] = useState([]);
  const joinRoom = () => {
    // setRoom("Admin")
    if (room === "") {
      socket.emit("join_room", room);
    }
  };
  useEffect(()=>{
    socket.emit("join_room", room);
  },[])

  const sendMessage = () => {
    socket.emit("send_message", { message, room,userId,stateRole,userName,src:"./assets/images/pic2.png"});
    setMessageSend(userId)
    
    console.log("sender",userId)
  };
  let newArray=[]

  socket.on("receive_message", (data) => {
     
    newArray.push(data.message)
    setMessageReceived([...messageReceived,data.userName,data.message]);
    setInfo([data.userName,data.message,data.userId,data.stateRole])
    console.log("new", info)//,data.userId,data.stateRole

    console.log("rceved",data.userId)
    //console.log(newArray)
   //// setMessageReceived(data.message);
    // {messageReceived.map((elem)=>{
    //   console.log(elem)
    //   return(<div><br>{elem}</br></div>)
    //         })}
   // console.log("newArray",messageReceived)
  });

  // useEffect(() => {}
  //   socket.on("receive_message", (data) => {
     
  //     newArray.push(data.message)
  //     setMessageReceived(newArray);
  //     //console.log(newArray)
  //    //// setMessageReceived(data.message);
  //     // {messageReceived.map((elem)=>{
  //     //   console.log(elem)
  //     //   return(<div><br>{elem}</br></div>)
  //     //         })}
  //    // console.log("newArray",messageReceived)
  //   });
  // }, [socket,setMessageReceived]);



  useEffect(() => {

socket.connect()
// console.log("mmmmmmmjjhjhj",messageReceived)
  },[])
  return (
    <div className="SOCITSYLE">
      <h2> Message:</h2>
      <hr></hr>
      {
      messageReceived&&messageReceived.map((elem)=>{
        console.log("mmmm",messageReceived[2])
        console.log("mmmmmmmjjhjhj",messagesend)
        if(messagesend !==info[2]){
         return <div className="bhbh">
          <img className="socitImage" src="./assets/images/pic2.png"></img>
          {elem}
          
          </div>
        }else if(messagesend ==info[2]){
        return  <div>
          <img className="socitImage" src="./assets/images/pic5.png"></img>
          {elem}
          
          </div>
        }


      })
      
      }
<div className="messagSend">
      <input className="socketText"
        placeholder="Message..."
        onChange={(event) => {
           setMessage(event.target.value);
        }}
      />
      <button className="btnSoct" onClick={sendMessage}> Send Message</button>
      
      <br></br>
    </div>
    </div>
  );
}

export default NewSoct;