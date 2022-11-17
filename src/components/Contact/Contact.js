import "./contact.css";
import Header from "../Header/header";
import Footer from '../Footer/Footer'

import { BsEmojiAngryFill } from "react-icons/bs";
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';


import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uodwo8m','template_wknyzfn', form.current, 'J8BtsotFO0nMuueRp')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


//   if(name.trim === ""){
//     return TransformStream.error("Name Is Required")
//   }
// if(email.trim === ""){
//   return TransformStream.error("Email Is Required")
// }
// if(description.trim === ""){
//   return TransformStream.error("Description Is Required")
// }

// console.log(name,email,description)


  return (<div className="contact-body">
    {/* alert message success */}
    {/* <div className="alert-success">
      <span> Message Sent! Thank you for contacting us.</span>
    </div> */}
     {/* alert message error */}
     {/* <div className="alert-error">
      <span> Something went wrong! please try again</span>
     </div> */}


     {/* <ToastContainer theme="colored" />  //this for desigin theme*/}
  <div className="contact-section">
    <div className="contact-info">
      <div><i class="bi bi-geo-alt-fill"></i>Amman, Amman, Jordan</div>
      <div><i class="bi bi-envelope-fill"></i>nawaforgiving@gmail.com</div>
      <div><i class="bi bi-telephone-fill"></i>+123 456 789</div>
      <div><i class="bi bi-clock-fill"></i>Sun -Fri 8:00 Am to 5:00 pm</div>
    </div>
    <div className="contact-form" >
      <h2>Contact Us</h2>
      <h2>We'd love to hear from you.</h2>
      {/* <form className="contact" action="" method="post"  >  */}
      <form className="contact" action="" method="post" ref={form} onSubmit={sendEmail} > 

        <input type="textt" name="name" className="text-boxx" placeholder="Your Name" required/>
        <input type="emaill" name="email" className="text-boxx" placeholder="Your Email" required/>
        <textarea name="message" rows="5" placeholder="your Message" required></textarea>
        <input type="submit" name="submit" className="send-btn" value="send"/>
      </form>
    </div>
  </div>
  </div>
  );
};
export default Contact;
// NOTE : still need
// 1.vaildition [ALERT MESSAGE]
// 2.map

