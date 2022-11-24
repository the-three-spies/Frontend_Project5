import "./FAQs.css";
import { useState } from "react";
const FAQs = () => {
    const [selected, setSelected] = useState(null)
    //------------
    const toggle = (i) =>{
        console.log("i",i)
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }
  return (

    <div className="FAQs-wrapper">
      <div className="FAQs-map-title-answer">
        {data.map((item,i)=>(
            <div className="item">
                <div className="title" onClick={()=>toggle(i)}>
                    <h2>{item.question}</h2>
                    <span>{selected === i ? "-" : "+"}</span>
                </div>
                <div className={selected === i ? "answershow" : "answer"}>{item.answer}</div>
            </div>
        ))}
      </div>
    </div>
  );
};
const data = [
  {
    question:"What is Fitrat Insan?",
    answer: "Fitrat Insan is now an innovation project and we wish to goes on it. ",
  },
  {
    question:"Where did the idea originate from?",
    answer:`The starting point for Fitrat Insan is that it is very inexpensive to help one needy for a day. `,

  },
  {
    question:"How did you believe on it?",
    answer:"We believe even more people would be willing to help if there was a simple and straightforward way of doing so. This is where the FitratInsan app comes.",
  },
  {
    question:"Who are the members of this idea",
    answer: "Hind,Walaa and Aseel founded Fitrat Insan.",
  },
  {
    question:"when did it apear",
    answer:"in November 2022 in Meraki Acadmey.",
  },
];
export default FAQs;
