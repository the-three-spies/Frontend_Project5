import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
// import {
//   UilEstate,
//   UilClipboardAlt,
//   UilUsersAlt,
//   UilPackage,
//   UilChart,
//   UilSignOutAlt,
// } from "@iconscout/react-unicons";
// import * as AiIcons from "react-icons/ai";

const Sidebar = () => {
  const [selcet, setselcet] = useState(0);
  const navigate=useNavigate()
  const SidebarData = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      // icon: <AiIcons.AiFillHome />,
    },
    {
      title: "Needy Cases",
      path: "/admin/needy_case",
      // icon: <UilClipboardAlt />,
    },
    {
      title: "Donation Order",
      path: "/admin/donation_order",
      // icon: <UilUsersAlt/>,
    },

    {
      title: "Users",
      path: "/admin/users",
      // icon: <UilPackage />,
    },
    {
      title: "Chat",
      path: "/admin/contact",
      // icon: <UilChart/>,
    },
    {
      title: "Events",
      path: "/admin/events",
      // icon: <FaIcons.FaEnvelopeOpenText />,
    },
    {
      title: "Support",
      path: "/admin/support",
      // icon: <IoIcons.IoMdHelpCircle />,
    },
  ];

  return (
    <>
          <div className="slid">
        {SidebarData.map((e,index) => {
          return (
            <div
              className="menuItem"
              onClick={() =>{ setselcet(index);
                navigate(e.path)
              }
              }
            >
              {/* <item.icon /> */}
              <p>{e.title}</p>
            </div>
          );
        })}
        </div>

    </>
  );

 

};

export default Sidebar;
