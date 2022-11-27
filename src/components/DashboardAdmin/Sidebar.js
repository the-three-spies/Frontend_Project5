import React, {useContext } from "react";
import { useNavigate} from "react-router-dom";
import {MdDashboard} from "react-icons/md"
import {BiUser,BiChat} from "react-icons/bi"
import {BsXLg,BsCalendar2Check,BsGraphUp,BsMenuButtonWide} from "react-icons/bs"
import {ImCalendar} from "react-icons/im"
import {CiLogin} from "react-icons/ci"
import {GrAdd} from "react-icons/gr"
import { setLogout } from "../../redux/reducers/auth";
import { useDispatch} from "react-redux";
import { MyContext } from '../../App'
import "./admin.css";
import "./admin2.css";
const Sidebar = () => {
  const { selcet,setselcet} = useContext(MyContext)
  const navigate=useNavigate()
  const dispacth = useDispatch()
  const SidebarData = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
       icon: <MdDashboard/>,
    },
    {
      title: "Users",
      path: "/admin/users",
       icon: <BiUser/>,
    },
    {
      title: "Needy Cases",
      path: "/admin/needy_case",
      icon:<BsMenuButtonWide/>,
    },
    {
      title: "Donation Order",
      path: "/admin/donation_order",
      icon: <BsCalendar2Check/>,
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: <BsGraphUp />,
    },
    {
      title: "Chat",
      path: "/admin/chat",
      icon: <BiChat/>,
    },
    {
      title: "Events",
      path: "/admin/events",
      icon: <ImCalendar/>,
    },
    
    // {
    //   title: "Add Campaign",
    //   path: "/admin/support",
    //   icon: <GrAdd />,
    // }, 
    {
      title: "Log Out",
      path: "/",
      icon: <CiLogin/>,
    }, 
  ];
  return (
    <>
          <div className="container_a">
        <div  className="menuItem_admin">
        {SidebarData.map((e,index) => {
          return (
            <div key={index} className={selcet==index?"menu_item_admin active":"menu_item_admin"}
              onClick={() =>{ setselcet(index);
                if(e.title=='Log Out')
                {
                  dispacth(setLogout())
                  navigate(e.path)

                }
                else
                {
                navigate(e.path)
                
              }}
              }>
                <span className="primary">{e.icon}</span>
              <h3>{e.title}</h3>

            </div>
          );
        })}
       </div>
        </div>

    </>
  );

 

};

export default Sidebar;
