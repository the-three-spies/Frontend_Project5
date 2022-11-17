import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
  
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
   },
   {
        title: "Needy Cases",
        path: "/needy_case",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Donation Order",
        path: "/donation_order",
        icon: <IoIcons.IoIosPaper />,
      },
    
  
  {
    title: "Users",
    path: "/users",
    icon: <IoIcons.IoIosPaper />,
    
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <FaIcons.FaPhone />,
  },
  {
    title: "Events",
    path: "/events",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];