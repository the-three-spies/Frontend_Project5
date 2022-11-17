import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDonationOrder } from "../../redux/reducers/doner";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
const Material = () => {
  const imagecase=['https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/person2_peh2ws.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668431004/per4_lx4ufh.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/person333_bqjeif.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668430984/pers3_op46c2.png']
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [needCase, setneedCase] = useState([]);
  const [case_id, setcase_id] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setdescription] = useState("");
  const [deleveryDate, setdeleveryDate] = useState(null);
  const [address, setaddress] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [clickon, setclickon] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { cateagory } = useSelector((state) => {
    return {
      cateagory: state.donation.cateagory,
    };
  });
  //===============================================================
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "y6jygqdj");
    data.append("cloud_name", "dqsg0zf1r");
    fetch("https://api.cloudinary.com/v1_1/dqsg0zf1r/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // setUrl(data.url)
        handelDonate(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  //===============================================================

  const getallNeedCase = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/needycase/needyCategory/${id}`
      );

      if (result.data.success) {
        setneedCase(result.data.cases);
      } else {
        throw Error;
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  //===============================================================

  const handelDonate = async (url) => {
    let information = {
      amount: null,
      description,
      address,
      deleveryDate,
      imgePathDoner: url,
      category_id: cateagory.id,
      case_id,
    };
    try {
      const result = await axios.post(
        `http://localhost:5000/dontes`,
        information,

        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("thank you form our heart , the process of donation done");
        dispatch(addDonationOrder(result.data.result));
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

  useEffect(() => {
    getallNeedCase(cateagory.id);
  }, []);

  //===============================================================

  return (
    <>
    <Navigation/>
      <h1>Material Form Donation</h1>
      <h2>{cateagory.title}</h2>
<div className="container-donate">
<div className="adddonate">
        <div  className='case_needy'>
      {needCase &&
        needCase.map((need, i) => {
          return (
            <div className="info_case">
              <p>case :{need.description}</p>
              <img className='img_case' src={imagecase[i]}></img>
             <div> <button className={clickon==need.id?'true':""}
                onClick={() => {
                  setcase_id(need.id);setclickon(need.id)

                }}
              >
              choose Case
              </button>
              </div>
            </div>
          );
        })}
        </div>
      <div>
        <label for="date">choose date as you like:</label>
        <input
          type="date"
          onChange={(e) => {
            setdeleveryDate(e.target.value);
          }}
        ></input>
        </div>
        <div>
        <label for="data">choose img to what you donte:</label>
        <input
          type="file"
          onChange={(e) => {setImage(e.target.files[0])  
             setSelectedImage(e.target.files[0]);}}
        ></input>
        </div>
        {selectedImage && (
      <div className="for_donat" >
      <img className="img_for_donat" alt="not found"  src={URL.createObjectURL(selectedImage)} />
      <br />
      <button className="registerbtnmove" onClick={()=>setSelectedImage(null)}>Remove</button>
      </div>
    )}
        <div>
        <input
          type="text"
          placeholder="input your address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        ></input>
        </div>
        <div>
        <input
          type="text"
          placeholder="input you message about your donation"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
      </div>
      {url && (
      <div>
<img className="spicddImg" alt="notfount"  src={url} />
      <br />
      <button className="registerbtnmove" onClick={()=>setImage(null)}>Remove</button>
      </div>
    )}
      <button className="button" onClick={uploadImage}> Donate Now</button>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
      </div>
      
      <div className="img_donat">
          <img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668536755/people-donate-food-tiny-characters-put-grocery-product-charity-box-volunteer-community-help-poor-holiday-food-drive-vector-concept_102902-4744_mjravs.webp"></img>
        </div>
        </div>
      <div><img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668205254/project5/Give-back_fg14vc.png"></img></div>
    </>
  );
};

export default Material;
