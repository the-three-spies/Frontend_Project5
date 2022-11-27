import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "./style.css";
import "./login.css";
import jwt_decode from "jwt-decode";
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout, setSataRole, setUserId ,setSataUserName} from "../../redux/reducers/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//===============================================================

const Login = () => {
  const inputRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [massage, setMessage] = useState("");
  const [statusGO, setStatusGO] = useState(true);
  const [status, setStatus] = useState(true);
  const [role_id, srtRolrId] = useState(0);
  const [googleToken, setGoogleToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [num, setNum] = useState(1);
  const [toasboolean,setTtoasboolean]=useState(false)
  const {auth ,userId,token,userName,stateRole }= useSelector((state) => {
    return {
      auth: state.auth.isLoggedIn,
      userId: state.auth.userId,
      token: state.auth.token,
      userName:state.auth.userName,
      stateRole:state.auth.stateRole,
    };
  });


  const google = window.google;
  function handleCallbackResponse(response) {
   // console.log("googleToken", response.credential);
    var decoded = jwt_decode(response.credential);
    setGoogleToken(decoded);
   // console.log("userInfo", decoded.email);
    //console.log("userInfo", decoded);

    setStatusGO(false);
  }

  const AddNewUse = () => {
    //console.log("emmmmmmmm", googleToken.email);
    //console.log(googleToken, googleToken.email);
    axios
      .post(`https://fetratinsandonationnewl.onrender.com/register`, {
        firstName: googleToken.given_name,
        lastName: googleToken.family_name,
        // age:decoded.email,
        city,
        email: googleToken.email,
        password,
        role_id,
      })
      .then((result) => {
       // console.log("hind");
       // console.log(result);
       // console.log(result.data.success);
        //console.log("result",result.data.result)
        if (result.data.success) {
          setStatus(true);
          setMessage("The user has been created successfully");

          axios
            .post(`https://fetratinsandonationnewl.onrender.com/login/`, {
              email: googleToken.email,
              password,
            })
            .then((result) => {
             // console.log("m", result.data.role);
              let roleNavigate = result.data.role;
              dispatch(setLogin(result.data.token));
              dispatch(setUserId(result.data.userId));
              dispatch(setSataUserName(result.data.firstName));
        dispatch(setSataRole(result.data.role))
        toast.success("Welcome")
        setTtoasboolean(true)
            //  console.log("auth", auth);
             // console.log("id", userId);
             // console.log("aut", token);
              // console.log( "mnmn", token)

              // {
              //   navgate("/Category");
              // }
             // console.log(roleNavigate);
              if (roleNavigate == 1) {
                //console.log("admin");
                const myTimeout = setTimeout(()=>{navgate("/admin/dashboard")}, 500);
                {
                }
              } else if (roleNavigate == 2) {
                //console.log("needy");

                const myTimeout = setTimeout(()=>{navgate("/Showcategories")}, 500);
              } else if (roleNavigate == 3) {
               // console.log("doner");


                const myTimeout = setTimeout(()=>{navgate("/donate")}, 500);

              }
            });
        }
      })
      .catch((err) => {
        // console.log(err.response.data)
        setStatus(false);
        if (err.response && err.response.data) {
          return setMessage(err.response.data.massage);
        }
        setMessage("Error happened while register, please try again");
      });
  };

  const getAllRoles = () => {
    axios
      .get(`https://fetratinsandonationnewl.onrender.com/roles`)
      .then((result) => {
        // console.log("result",result.data.result)

        setRoles(result.data.result);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllRoles();

    google?.accounts.id.initialize({
      client_id:
        "749189994493-dks574gt6fsuoi1hh45skrrjn64jqith.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google?.accounts.id.renderButton(document.getElementById("sinInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  useEffect(() => {
    inputRef.current.focus();
  }, [num]);

  // const userId = useSelector((state) => {
  //   return {
  //     userId: state.auth.userId,
  //   };
  // });
  // const token = useSelector((state) => {
  //   return {
  //     token: state.auth.token,
  //   };
  // });
  const dispatch = useDispatch();

  const navgate = new useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMesage] = useState("");

  const loginUser = (b) => {
   // setTtoasboolean(true)

    axios
      .post(`https://fetratinsandonationnewl.onrender.com/login/`, {
        email,
        password,
      })
      .then((result) => {
       // console.log("m", result.data.role);
        let roleNavigate = result.data.role;
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        setMesage(result.data.message);
//walaa add
dispatch(setSataRole(result.data.role))
dispatch(setSataUserName(result.data.firstName));
toast.success("Welcome")
              setTtoasboolean(true)
       // console.log("auth", auth);
       // console.log("id", userId);
       // console.log("aut", token);
        // console.log( "mnmn", token)

        // {
        //   navgate("/Category");
        // }
       // console.log(roleNavigate);
        if (roleNavigate == 1) {
        //  console.log("admin");
         ;const myTimeout = setTimeout(()=>{navgate("/admin/dashboard")}, 500);
          {
          }
        } else if (roleNavigate == 2) {
        //  console.log("needy");

           const myTimeout = setTimeout(()=>{navgate("/Showcategories")}, 500);
        } else if (roleNavigate == 3) {
        //  console.log("doner");

          const myTimeout = setTimeout(()=>{navgate("/donate")}, 500);
        }
      })
      .catch((err) => {
       // console.log("err", err);
        setMesage(err.response.data.message);
        throw err;
      });
  };
  let x = 1;
  const changeRef = (e) => {
    // console.log(e);
    if (e.code === "Enter") {
     // console.log(e.code);
      x++;
      setNum(num + 1);
    }
  };
  //------------- show password -------------
  const showHidePassword = () => {
    setShowPassword((prev) => !prev);
  };
  //-------------return desigin----------------
  return (
    <div className="form_wrapper_login">
      <ToastContainer/>
      {statusGO ? (
        <div
          // onSubmit={(event) => event.preventDefault()}
          className="login_form"
        >
          <h1 className="login-title">Login</h1>
          <input
            onKeyDown={changeRef}
            ref={num === 1 ? inputRef : null}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="emaill"
            placeholder="Email"
          />
          {/* <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="passwordd"
            placeholder="Password"
          /> */}
          {/* ---show hide password-- */}
          <div className="sticktheicon">
          <input
          className="stickTheEyePassword"
            ref={num === 2 ? inputRef : null}
            type={showPassword === true ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              
            }}
            onKeyDown={(e) => {
              if (num == 2 && e.code == "Enter") {
//console.log("xcv")
                loginUser();
              }
            }}
          />
          {/* {showPassword ? (
            <i
              onClick={showHidePassword}
              className="bi bi-eye-fill show-password-icon"
            ></i>
            
          ) : (
            <i
              onClick={showHidePassword}
              className="bi bi-eye-slash-fill show-password-icon"
            ></i>
          )} */}
          </div>
          <button className={toasboolean === false ? "form_login_btn" : "newform_login_btn"}
         

            onClick={ loginUser}
           
          >
            
            Login
          </button>

          <br></br>
          <button id="sinInDiv" className="form_login_btn"></button>
        </div>
      ) : (
        <div>
          {/* REGERTER AFTER COME FROM GOGLE */}
          <div className="register_form">
            {true ? (
              <>
                <h1 className="form-title">Register</h1>
                <input
                className="inputPlacecholder"
                  type="number_register"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <input
                className="inputPlacecholder"
                  type="text_register"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                
                        <select
          id="role_id_register"
          onChange={(e) => {
            srtRolrId(e.target.value);
          }}
        >
          <option disabled selected  id="option_role_is" value="1">
            Select User Type
          </option >
          {roles.length > 0 &&
            roles.map((elem, i) => {
              return (
                <option
                  key={`register${i}`}
                  value={elem.id}
                >
                  {elem.role}
                </option>
              );
            })}
        </select>
                
               
                {/* <input
                  type="text_register"
                  name=""
                  list="role"
                  placeholder="Role"
                />
                <select id="role">
                  {roles.length > 0 &&
                    roles.map((elem, i) => {
                      return <option value={elem.id}>{elem.role}</option>;
                    })}
                </select> */}
                <input
                className="inputPlacecholder"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="form_register_btn" onClick={AddNewUse}>
                  Register
                </button>
                <br />

                {status
                  ? massage && <div className="SuccessMessage">{massage}</div>
                  : massage && <div className="ErrorMessage">{massage}</div>}
              </>
            ) : (
              <p>Logout First</p>
            )}
          </div>
          {/* REGERTER AFTER COME FROM GOGLE */}
        </div>
      )}
      <div className="form_footer">
        Don't have an account?{" "}
        <Link to="/register" className="Form_Link">
          Register
        </Link>
      </div>
    </div>
  );
  //-------------return desigin----------------

  //-----------------
  return (
    <div className="mainloginDev">
      <div className="imgregester imglogin">
        <img className="" src="./assets/images/login1.png" alt="pic"></img>
      </div>
      {statusGO ? (
        <div className="container">
          <h1>Login</h1>
          <p>Please enter your correct email and password.</p>
          <hr></hr>
          <label>
            <b>Email</b>
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          ></input>

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          ></input>

          <hr></hr>
          <p>{message}</p>

          <button onClick={loginUser} className="registerbtn">
            Login
          </button>
          <button id="sinInDiv"></button>
        </div>
      ) : (
        <div>
          {/* REGERTER AFTER COME FROM GOGLE */}

          <div className="Form">
            {true ? (
              <>
                <p className="Title">Register:</p>
                <br />
                <br />
                <input
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                <br />
                {/*  */}
                <br />
                <select
                  onChange={(e) => {
                    srtRolrId(e.target.value);
                  }}
                >
                  <option disabled selected value>
                    {" "}
                    -- select a User Type --{" "}
                  </option>
                  {roles.length > 0 &&
                    roles.map((elem, i) => {
                      return (
                        <option
                          value={elem.id}

                          // textContent={elem.specialty}
                        >
                          {elem.role}
                        </option>
                      );
                    })}
                </select>{" "}
                <br />
                {/*  */}
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="registerbtn" onClick={AddNewUse}>
                  Register
                </button>
                <br />
                {status
                  ? massage && <div className="SuccessMessage">{massage}</div>
                  : massage && <div className="ErrorMessage">{massage}</div>}
              </>
            ) : (
              <p>Logout First</p>
            )}
          </div>

          {/* REGERTER AFTER COME FROM GOGLE */}
        </div>
      )}
    </div>
  );
};
export default Login;
