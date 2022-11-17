import React from "react";
import MyResponsivePie from "./pie";
import MyResponsivePie1 from "./pie2";
import MyResponsivePie3 from "./pie3";
import { useState } from "react";
import NeedCase from "./needytable";
import Sidebar from "./Sidebar";
const MainDashboard = () => {

  // color=['#F9920E','#49A34D','#E9403D','#15B7CD']
  return (
    <>
    
    <div className="container_admin_dash">
   
    <div className="pie_chart">
        <MyResponsivePie />
        <MyResponsivePie1 />
        <MyResponsivePie3 />
      </div>
      <NeedCase/>
      </div>
    </>
  );
};

export default MainDashboard;
