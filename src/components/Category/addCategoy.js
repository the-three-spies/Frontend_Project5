import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/reducers/category";
import { useNavigate } from "react-router-dom";
//---------------- AddCategory ----------------
const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [imgePath, setImgePath] = useState("");

  const { newCategory } = useSelector((state) => {
    return {
      newCategory: state.category.category,
    };
  });
  //---------------- handleAddCategory ----------------
  const handleAddCategory = () => {
    axios
      .post(`https://fetratinsandonationnewl.onrender.com/categories`, {
        title,
        imgePath,
      })
      .then((result) => {
        //console.log(result)
        dispatch(addCategory({ title, imgePath }));
        console.log("cat", newCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //---------------- return ----------------
  return (
    <>
      <div>
        <input
          placeholder="title"
          type={"text"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <button onClick={handleAddCategory}>add Category</button>
      </div>
    </>
  );
};
export default AddCategory;
