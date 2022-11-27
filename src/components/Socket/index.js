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
import ScrollToBottom from "react-scroll-to-bottom";
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
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
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
    // socket.emit("send_message", { message, room,userId,stateRole,userName,src:"./assets/images/pic2.png"});
    // setMessageSend(userId)
    
    // console.log("sender",userId)
////////////////////////
if (currentMessage !== "") {
  const messageData = {
    room: room,
    author: userName,
    message:currentMessage,
    stateRole:stateRole,
    time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
  };

   socket.emit("send_message", messageData);
  // setMessageList((list) => [...list, messageData]);
  setCurrentMessage("");
}

  };
  //let newArray=[]

  socket.on("receive_message", (data) => {
     
    //newArray.push(data.message)
    setMessageList([...messageList,data]);
    setInfo([data.userName,data.message,data.userId,data.stateRole])
    // console.log("new", info)//,data.userId,data.stateRole

    // console.log("rceved",data.userId)
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
    <div className="socket_wrapper">
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">
          {messageList&&messageList.map((messageContent,i) => {
            return (
              <div key={`onemessage${i}`}
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
        
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
    </div>
  );
}

export default NewSoct;