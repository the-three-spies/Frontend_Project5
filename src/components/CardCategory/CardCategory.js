import "./cardCategory.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import category, {
  setCategory,
  setCategoryId,
} from "../../redux/reducers/category";
import AddNeedy from "../CreateCase";
import NeedyByCategoy from "../DashboardNeedy/GetNeedyByCategoryId";
//---------------- AddCategory ----------------
const CardCategory = () => {
  const dispatch = useDispatch();
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
  //---------------- setCategory ----------------
  useEffect(() => {
    axios
      .get(`http://localhost:5000/categories`)
      .then((result) => {
        console.log("result", result.data.result);
        dispatch(setCategory(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  //---------------- return ----------------
  return (
    <div className="card-category">{/* tourlist */}
      {newCategory.length > 0 &&
        newCategory.map(item => (
          <div className="card-item">
            <img
              src={item.imgepath}
              alt={item.title}
              className="card-item-img"
            />
            <div className="card-item-body">
              <div className="card-item-title">{item.title}</div>
              {/* <div className="card-item-more"></div> */}
              {/* need to description  ... about this section ..write short pragraph */}
              <button className="card-item-more-info">See More</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default CardCategory;
//note: need to add "p" in the category table(BEnd) ...  then in postman ... after that(FEnd) add it here with styling
