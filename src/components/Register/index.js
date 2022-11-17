import React, { useContext, useState } from "react";
// import "./style.css";
import './register.css';
import axios from "axios";
import { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout, setUserId,setSataUserName,setSataRole } from "../../redux/reducers/auth";

//===============================================================




const Register = () => {


 const navgate=useNavigate()
    
    //const { isLoggedIn } = useContext(AuthContext);
    //role id
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const[role_id,srtRolrId]=useState(0)


    const auth = useSelector((state) => {
        return {
          auth: state.auth.isLoggedIn,
        };
      });
      const userId = useSelector((state) => {
        return {
          userId: state.auth.userId,
        };
      });
      const token = useSelector((state) => {
        return {
          token: state.auth.token,
        };
      });
      const dispatch = useDispatch();
    

 const getAllRoles=()=>{
    axios.get(`http://localhost:5000/roles`).
    then((result)=>{
//console.log("result",result.data.result)

setRoles(result.data.result)
    })
    .catch((err)=>{

    })
}
 

const AddNewUse=()=>{

    axios.post(`http://localhost:5000/register`, {
        firstName,
        lastName,
        age,
        city,
        email,
        password,
        role_id,
      })
    .then((result)=>{
console.log("result",result.data.result)
if (result.data.success) {
    setStatus(true);
    setMessage("The user has been created successfully");


    axios
    .post(`http://localhost:5000/login/`, {
      email,
      password,
    })
    .then((result) => {
      console.log("m", result.data.role);
      let roleNavigate = result.data.role;
      dispatch(setLogin(result.data.token));
      dispatch(setUserId(result.data.userId));
      dispatch(setSataUserName(result.data.firstName));
      dispatch(setSataRole(result.data.role))

      console.log("auth", auth);
      console.log("id", userId);
      console.log("aut", token);
      // console.log( "mnmn", token)

      // {
      //   navgate("/Category");
      // }
      console.log(roleNavigate);
      if (roleNavigate == 1) {
        console.log("admin");
        // navgate("/");
        {
        }
      } else if (roleNavigate == 2) {
        console.log("needy");

        navgate("/Showcategories")
      } else if (roleNavigate == 3) {
        console.log("doner");

        // navgate("/")
      }
    })

  } 

    })
    .catch((err)=>{
       // console.log(err.response.data)
        setStatus(false);
        if (err.response && err.response.data) {
          return setMessage(err.response.data.massage);
       }
       setMessage("Error happened while register, please try again");
      
    })


}

useEffect(()=>{
getAllRoles()
},[])

  //-------------return desigin----------------
  return(
    <div className="form_wrapper_register">

      <form onSubmit={(event)=>event.preventDefault()} className="register_form">
      <h1 className="form-title">Register</h1>
      <input
                  type="text_register"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                              <input
                  type="text_register"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                              <input
                  type="number_register"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                    <input
                  type="text_register"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                            <input type="text_register" name="" list="role" placeholder="Role"/>
                            {/* <div class="box"> */}
            <datalist id="role">
            { roles.length>0&&  roles.map((elem, i) => {
             return (
            <option
             value={elem.id}>
             {elem.role}
            </option>
             );
             })}
            </datalist>
            {/* </div> */}
        <input onChange={(e) => {
              setEmail(e.target.value);
            }} type="emaill" placeholder="Email"/>
        <input onChange={(e) => {
              setPassword(e.target.value);
            }} type="passwordd" placeholder="Password"/>

        <button onClick={AddNewUse} className="form_register_btn">Register</button>
        {status
                ? message && <div className="alert_success">{message}</div>
                : message && <div className="alert_error">{message}</div>}
      </form>
      <div className="form_footer">
        Already have an account?{" "}
        <Link to="/login" className="Form_Link">
          Login
        </Link>
      </div>
    </div>
  )
  //-------------return desigin----------------
return(
<div className=" mainRegisterDiv">

<div>
<img className="imgRegister" src="./assets/images/pic2.png" alt="pic"></img>
</div>
<div className="Form">
        {true ? (
          <>
            <h1>Register</h1>
        <p>Please enter your Information to Register </p>
        <hr></hr>
              <br />
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
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
            <option disabled selected value> -- select a User Type -- </option>
            { roles.length>0&&  roles.map((elem, i) => {
              return (
                <option
                  value={elem.id}

                  // textContent={elem.specialty}
                >
                  {elem.role}
                </option>
              );
            })}
          </select>
          <br />
{/*  */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="registerbtn" onClick={AddNewUse}>Register</button>
              <br />
           
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>

</div>


)

//------------------------------------
}
export default Register  