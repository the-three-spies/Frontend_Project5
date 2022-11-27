import "./contact.css";
import Header from "../Header/header";
import Footer from "../Footer/Footer";
import React, { useContext, useState, useEffect, useRef } from "react";
import { BsEmojiAngryFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log({name,
    email,
  description})
    if (!name) {
      toast.error("Name Is Required");
      return;
    }
    if (!email) {
      toast.error("Email Is Required");
      return;
    }
    if (!description) {
      toast.error("Description Is Required");
      return;
    }

    emailjs
      .sendForm(
        "service_uodwo8m",
        "template_wknyzfn",
        form.current,
        "J8BtsotFO0nMuueRp"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <ToastContainer/>
      <div className="contact-body">
        <div className="contact-section">
          <div className="contact-info">
            <div class="contact_info_menue">
              <i class="bi bi-geo-alt-fill"></i>Amman, Amman, Jordan
            </div>
            <div class="contact_info_menue">
              <i class="bi bi-envelope-fill"></i>fitratinsancommunity@gmail.com
            </div>
            <div class="contact_info_menue">
              <i class="bi bi-telephone-fill"></i>+962 770508989
            </div>
            <div class="contact_info_menue">
              <i class="bi bi-clock-fill"></i>Sun -Fri 8:00 Am to 5:00 pm
            </div>
          </div>
          <div className="contact-form">
            <h2>Contact Us</h2>
            <form
              className="contact"
              action=""
              method="post"
              ref={form}
              onSubmit={sendEmail}
            >
              <input
                type="textt"
                name="name"
                className="text-boxx"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="emaill"
                name="email"
                className="text-boxx"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
              id="change_theplaceholder"
                name="message"
                rows="5"
                placeholder="Your Message"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="submit"
                name="submit"
                className="send-btn"
                value="send"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
