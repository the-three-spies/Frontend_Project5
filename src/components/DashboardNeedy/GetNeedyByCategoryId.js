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
const NeedyByCategoy = (id) => {
  console.log("id", id);
  const dispatch = useDispatch();
  const [description, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  //useSelector
  const { reduxaddnewneddy } = useSelector((state) => {
    return {
      reduxaddnewneddy: state.needy.needy,
    };
  });
  const { CategoryId } = useSelector((state) => {
    return {
      CategoryId: state.category.categoryId,
    };
  });
  //---------------- Set The Needy ----------------
  useEffect(() => {
    //console.log("id", myId);
    //console.log("id", myId);
    console.log("CategoryId", CategoryId);
    axios
      .get(`https://fetratinsandonationnewl.onrender.com/needycase/needyCategory/${CategoryId}`)
      .then((result) => {
        console.log("set result", result.data.cases);
        console.log("set result", result.data.cases);
        dispatch(setNeedyCase(result.data.cases));
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

export default NeedyByCategoy;
