import { ResponsivePie } from "@nivo/pie";
import axios from 'axios'
import { useEffect, useState } from "react";

export const color = [
     "hsl(8, 70%, 50%)",
     "hsl(104, 70%, 50%)",
    "hsl(122, 70%, 50%)",
     "hsl(111, 70%, 50%)",
    "hsl(186, 70%, 50%)"
    
  ];

const MyResponsivePie3 = () => {
 //===============================================================
const [data,setdata]=useState([]);
 const getNumActivCase = async () => {

  try {
    const result = await axios.get(`https://fetratinsandonationnewl.onrender.com/admin/numberofActiv`);
    if (result.data.success) {
   
        const newdata=result.data.result.map((e,i)=>
        {
          return ({...e,color:color[i],id:e.label})
    
        })
      setdata(newdata)
      
    } else {
      throw Error;
    }
  } catch (error) {
   
  console.log(error)
  }
};

  //===============================================================

useEffect(() => {
    getNumActivCase()

 
}, [])
  
  
 // ===============================================================
  
  
   return (
    <div className="chart"> 
  <h3> State Status of requests fulfilled</h3>
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
  />
  </div>

);
  }

export default MyResponsivePie3;