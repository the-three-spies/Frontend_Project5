import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNeedyCase,
  addNeedyCase,
  updateNeedyCase,
  deleteNeedyCase,
} from "../../redux/reducers/Needy";
//---------------- The Needy ----------------
const TheNeedy = () => {
  const dispatch = useDispatch();
  const [description, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const { reduxaddnewneddy } = useSelector((state) => {
    return {
      reduxaddnewneddy: state.needy.needy,
    };
  });
  const { CategoryId } = useSelector((state) => {
    return {
      CategoryId: state.category.CategoryId,
    };
  });
  //---------------- Set The Needy ----------------
  useEffect(() => {
    console.log("gdfsdd", CategoryId);
    axios
      .get("https://fetratinsandonationnewl.onrender.com/needycase")
      .then((result) => {
        console.log("set result", result.data.result);
        dispatch(setNeedyCase(result.data.result));
        console.log("get", reduxaddnewneddy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  //---------------- return ----------------
  return (
    <div>
      <button
        onClick={() => {
          navigate("add");
        }}
      >
        add needy case
      </button>
      {reduxaddnewneddy.map((element, i) => {
        return (
          <div>
            <p>{element.description}</p>
            <p>{element.amount}</p>
            <p>{element.address}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TheNeedy;
