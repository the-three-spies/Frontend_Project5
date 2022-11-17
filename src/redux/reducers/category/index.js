// needy reducer
import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
//1. create slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categoryId:null,
  },
  reducers: {
    setCategory: (state, action) => {              //get
      state.category = action.payload;
    },
    addCategory: (state, action) => {             //create
      state.category.push(action.payload);
      // console.log("addCategory", addCategory);
    },
    setCategoryId:(state,action)=>{
      // console.log("action.payload", action.payload);
    state.categoryId=action.payload
      //localStorage.setItem("categoryId", action.payload);
    }
  },
});

export const { setCategory, addCategory,setCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
