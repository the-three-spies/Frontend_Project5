import { ResponsiveLine } from '@nivo/line'
import axios from 'axios'
import { useEffect, useState } from "react";
const dataArray=[
    {
      "id": "Needy Cases",
      "color": "hsl(31, 70%, 50%)",
      
    },
   
    {
      "id": "Donation Orders",
      "color": "hsl(254, 70%, 50%)",
      
    }
  ]
export const color = [
     "hsl(31, 70%, 50%)",
     "hsl(254, 70%, 50%)" 
  ];

const MyResponsivePie4 = () => {
 //===============================================================
const [data,setdata]=useState([]);
const [message, setMessage] = useState("");
const [status, setStatus] = useState(false);
 const getStateMonth= async () => {

  try {
    const result = await axios.get(`https://fetratinsandonationnewl.onrender.com/admin/state`);
    if (result.data.success) {
 
      const newState=dataArray.map((e,index)=>
      {
       return({...e,data:result.data.result[index]})
      })
  
    setdata(newState)
    console.log(result.data.result)
    //   setStatus(true);
    //             setMessage("")
      
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
    getStateMonth()

 
}, [])
  
  
 // ===============================================================
  
  
   return (
    <div className="chart"> 
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Annual report Fitrat Insan App (Month)',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />

          <span></span>

  </div>

);
  }

export default MyResponsivePie4;