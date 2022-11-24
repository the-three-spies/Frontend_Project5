//in navbar
//icon         [navbar (category dropdown list)(contactus..aboutus ...)]            searchbox  myorder
//category contact aboutus ourStory project FAQ ourTeam

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import category, {
  setCategory,
  setCategoryId,
} from "../../redux/reducers/category";
import AddNeedy from "../CreateCase";
import NeedyByCategoy from "../DashboardNeedy/GetNeedyByCategoryId";

const Navbar = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imgePath, setImgePath] = useState("");
  //useSelector
  const { newCategory } = useSelector((state) => {
    return {
      newCategory: state.category.category,
    };
  });
  const { CategoryId } = useSelector((state) => {
    return {
      CategoryId: state.category.categoryId,
    };
  });
  //-------------get All Category------------- set category
  useEffect(() => {
    axios
      .get(`https://fetratinsandonationnewl.onrender.com/categories`)
      .then((result) => {
        console.log("result", result.data.result);
        dispatch(setCategory(result.data.result));
        // console.log(newCategory)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  //---------------------------
  return (
    <nav style={{ left: toggle && "0" }} className="navbar">
      <ul className="navbar-links">
      <div class="dropdown">
  <li>category</li>
  <div class="dropdown-content">
  <li>          {" "}
          {newCategory.map((element, i) => {
            return (
              <Link
                to={`/NeedyCaseByCategory/${element.id}`}
                className="navbar-link"
                onClick={() => setToggle(false)}
              >
                {element.title}
              </Link >
            );
          })}</li>
  </div>
</div>


        <li className="navbar-link">About Us</li>
        <li className="navbar-link">Contact Us</li>
        <li className="navbar-Link"><Link to="/contactUs" className="navbar-Link">Contact Us</Link></li>
        <li className="navbar-link">Our Story</li>
        <li className="navbar-link">FAQs</li>
      </ul>
    </nav>
  );
};
export default Navbar;
