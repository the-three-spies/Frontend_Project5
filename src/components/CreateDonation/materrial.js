import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDonationThingOrder } from "../../redux/reducers/doner";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Material = () => {
  const imagecase = [
    'https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/per4-removebg-preview_qa2wku.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/pers3-removebg-preview_sm4ph8.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669150185/person1-removebg-preview_yoheca.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669150533/222-removebg-preview_wmxvoj.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669162717/person333-removebg-preview_wuqmsz.png','https://res.cloudinary.com/dqsg0zf1r/image/upload/v1669149184/per333-removebg-preview_n5joia.png'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
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
  const [toasboolean,setTtoasboolean]=useState(false)
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  // const { cateagory } = useSelector((state) => {
  //   return {
  //     cateagory: state.donation.cateagory,
  //   };
  // });
  const cateagory = params.id;
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
        toast.success("thank you form our heart , the process of donation done")
        setTtoasboolean(true)
        const myTimeout = setTimeout(()=>{navigate("/mythingdonation")}, 500);
    
      })
      .catch((err) => console.log(err));
  };

  //===============================================================

  const getallNeedCase = async (id) => {
    try {
      const result = await axios.get(
        `https://fetratinsandonationnewl.onrender.com/needycase/needyCategory/${id}`
      );

      if (result.data.cases) {
        console.log("result.data.cases", result.data.cases);
        setneedCase(result.data.cases);
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };
  //===============================================================

  // const handelDonate = async (url) => {
  //   let information = {
  //     amount: null,
  //     description,
  //     address,
  //     deleveryDate,
  //     imgePathDoner: url,
  //     category_id: cateagory.id,
  //     case_id,
  //   };
    const handelDonate = async (url) => {
      let information = {
        amount: null,
        description,
        address,
        deleveryDate,
        imgePathDoner: url,
        category_id: cateagory,
        case_id,
      };
    try {
      const result = await axios.post(
        `https://fetratinsandonationnewl.onrender.com/dontes`,
        information,

        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.data.success) {
        // setStatus(true);
        // setMessage("thank you form our heart , the process of donation done");
   
        // setMessage("Your Case has been created successfully");
        dispatch(addDonationThingOrder(result.data.result));
      
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
    getallNeedCase(cateagory);
  }, []);

  //===============================================================
  //..................START return Desigin return START.....................
  return (
    <div className="container_donate">
        <ToastContainer/>
      {/* <Navigation/> */}
      {/* <h1>Material Form Donation</h1> */}
      {/* <h2>{cateagory.title}</h2> */}
      {/* mapopen */}
      <div className="map">
        {needCase &&
          needCase.map((need, i) => {
            // console.log("needycase",needCase)
            return (
              <div key={i} className="card_forDonate">
                <div className="img_donate">
                  <img src={imagecase[i]}></img>
                </div>
                <div className="infocard_donate">
                  <div className="details">
                    <h2 className="moveit">
                    {need.description}
                      {/* Needy Name */}
                      <span className="moveit"></span>
                    </h2>
                    {/* <div className='data_donate'>
             <h3>{need.amount}<br/><span>Amout</span></h3>
             <h3>{need.donation_amount}<br/><span>Dnoation</span></h3>
             <h3>{need.rest}<br/><span>Remaining</span></h3>
           </div> */}
                    <div className="chosecasebtn_donate">
                      <button
                        className={clickon == need.id ? "true" : "chosecasebtn_donate"}
                        onClick={() => {
                          setcase_id(need.id);
                          setclickon(need.id);
                        }}
                      >
                        Choose
                      </button>
                      <button>Message</button>
                      {/* <button><Link to="/NewSoct">Message</Link></button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* start donate material */}
      <div className='part22' >
      <div className='cardpt2material_forDonate'>
        <div className='details_box'></div>
      {/*1111111111111111111111111111111111111111111111*/}
      <span className="info_donate">
        <label for="date">Date</label>
        <input
        
          type="date"
          onChange={(e) => {
            setdeleveryDate(e.target.value);
          }}
        ></input>
      </span>
     

       {/* 2222222222222222222222222222222222222222222222 NOT APPEAR???????????????????  */}

     {/* 3333333333333333333333333333333333333333333333  */}
      <div className="info_donate">
      <label for="data">Adress</label>
        <input
        className="placeMaterial"
          type="text"
          placeholder="Your Adress"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        ></input>
      </div>
      {/* 444444444444444444444444444444444444444444444444444444           */}
      <div className="info_donate">
      <label for="data">Mesage</label>
        <input
        className="placeMaterial"
          type="text"
          placeholder="Your Message"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
      </div>
      {/* 5555555555555555555555555555555555555555555555555555555555*/}
      {url && (
        <div className="info_donate">
          <img className="" alt="notfount" src={url} />
          <br />
          <div className="chosecasebtn2_donate">
            <button onClick={() => setImage(null)}>Remove</button>
          </div>
        </div>
      )}
 {/*66666666666666666666666666666666666666666666666666666666666*/}
<div className="info_donate">
        <label for="data">Image</label>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setSelectedImage(e.target.files[0]);
          }}
        ></input>
      </div>

      {selectedImage && (
        <div className="info_donate">
          <img
            className="img_for_donat"
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <div className='chooseImg_donate'>
          <button
            className=""
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </button>
        </div>
        </div>
      )}
      {/* 77777777777777777777777777777777777777777777777777777777777*/}
      <div className="chosecasebtn2_donate">
      <button className={toasboolean === false ? "send-btn" : "newsend-btn"} onClick={uploadImage}>
        {" "}
        Donate Now
      </button>
      </div>
      {/* 8888888888888888888888888888888888888888888888888888888888888*/}
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
      {/* 999999999999999999999999999999999999999999999999999999999999999 */}
    </div>
    </div>
    </div>
    
  );
  {/* //.................. END Desigin END ..................... */}
  return (
    <>
      {/* <Navigation/> */}
      <h1>Material Form Donation</h1>
      <h2>{cateagory.title}</h2>
      <div className="container-donate">
        <div className="adddonate">
          <div className="case_needy">
            {needCase &&
              needCase.map((need, i) => {
                return (
                  <div className="info_case">
                    <p>case :{need.description}</p>
                    <img className="img_case" src={imagecase[i]}></img>
                    <div>
                      {" "}
                      <button
                        className={clickon == need.id ? "true" : ""}
                        onClick={() => {
                          setcase_id(need.id);
                          setclickon(need.id);
                        }}
                      >
                        choose Case
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          {/*1111111111111111111111111111111111111111111111*/}
          <div>
            <label for="date">choose date as you like:</label>
            <input
              type="date"
              onChange={(e) => {
                setdeleveryDate(e.target.value);
              }}
            ></input>
          </div>
          {/* 2222222222222222222222222222222222222222222222 */}
          <div>
            <label for="data">choose img to what you donte:</label>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setSelectedImage(e.target.files[0]);
              }}
            ></input>
          </div>
          {/* 3333333333333333333333333333333333333333333333 */}
          {selectedImage && (
            <div className="for_donat">
              <img
                className="img_for_donat"
                alt="not found"
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                className="registerbtnmove"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
            </div>
          )}
          {/* 444444444444444444444444444444444444444444444444444444           */}
          <div>
            <input
              type="text"
              placeholder="input your address"
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            ></input>
          </div>
          {/* 5555555555555555555555555555555555555555555555555555555           */}
          <div>
            <input
              type="text"
              placeholder="input you message about your donation"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </div>
          {/*666666666666666666666666666666666666666666666666666666 */}
          {url && (
            <div>
              <img className="spicddImg" alt="notfount" src={url} />
              <br />
              <button
                className="registerbtnmove"
                onClick={() => setImage(null)}
              >
                Remove
              </button>
            </div>
          )}
          {/* 77777777777777777777777777777777777777777777777777777777777           */}
          <button className="button" onClick={uploadImage}>
            {" "}
            Donate Now
          </button>
          {/* 8888888888888888888888888888888888888888888888888888888888           */}
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
        {/* 999999999999999999999999999999999999999999999999999999999999999 */}
        <div className="img_donat">
          <img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668536755/people-donate-food-tiny-characters-put-grocery-product-charity-box-volunteer-community-help-poor-holiday-food-drive-vector-concept_102902-4744_mjravs.webp"></img>
        </div>
      </div>
      <div>
        <img src="https://res.cloudinary.com/dqsg0zf1r/image/upload/v1668205254/project5/Give-back_fg14vc.png"></img>
      </div>
    </>
  );
};

export default Material;
