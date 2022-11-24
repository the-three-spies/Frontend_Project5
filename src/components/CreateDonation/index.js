import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import Navigation from "../Navigation";
import { setIDCateogory } from "../../redux/reducers/doner";
import "./style.css";
const DonationOrder = () => {
  const dispatch = useDispatch();
  const [donationCategory, setdonationCategory] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //===============================================================

  const getallCategory = async () => {
    try {
      const result = await axios.get(`https://fetratinsandonationnewl.onrender.com/categories`);
      if (result.data.success) {
        setdonationCategory(result.data.result);
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  const handelidctaegory = (id, title) => {
    if (id === 3) {
      dispatch(setIDCateogory({ id, title }));
      navigate(`/monydonation/${id}`);
    } else {
      dispatch(setIDCateogory({ id, title }));
      navigate(`/materialdonation/${id}`);
    }
  };
  //===============================================================

  useEffect(() => {
    getallCategory();
  }, []);
  //===============================================================
  return (
    <>
    {/* <Navigation/> */}
    <div className="aonate_body_donate">
      <div className="donate_card_category_container">
        {donationCategory.length  &&
          donationCategory.map((item,i) => (
            <div key={i}className="donate_card_category_wrapper">
              <img
                src={item.imgepath}
                alt={item.title}
                className="donate_card_category_image"
              />
              <div className="donate_card_category_intro">
                <h1 className="donate_card_category_intro_title">{item.title}</h1>
                <p
                  className="donate_card_category_intro_p"
                      onClick={() => {
                        handelidctaegory(item.id, item.title);
                      }}
                >
                   here are our donations in the  <br></br>
                  <span>'{item.title}'</span>
                  section .<br></br>
                  <br></br>if you want to give someone helps click here.<br/> 
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );


  // return (
  //   <>
  //     <h1>Form donation</h1>
  //     <div className="container-donate">
  //       <div className="adddonate">
  //         <div className="list-category">
  //           {donationCategory &&
  //             donationCategory.map((element, i) => {
  //               return (
  //                 <div key={i}>
  //                   <p>{element.title}</p>
  //                   <img src={element.imgepath}></img>
  //                   <button
  //                     onClick={() => {
  //                       handelidctaegory(element.id, element.title);
  //                     }}
  //                   >
  //                     donate AT Here
  //                   </button>
  //                 </div>
  //               );
  //             })}
  //         </div>
  //       </div>
  //       <div className="img_donate">
  //         <img src="https://res.cloudinary.com/ddjnfzv4h/image/upload/v1668025209/samples/Hand_of_generous_person_putting_heart_in_jar_phk8z1.jpg"></img>
  //       </div>
  //     </div>
  //   </>
  // );




};
export default DonationOrder;
