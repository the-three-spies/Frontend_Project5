// needy reducer
import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
//1. create slice
export const needySlice = createSlice({
  name: "needy",
  initialState: {
    needy: [],
    needyId: null,
  },
  reducers: {
    setNeedyCase: (state, action) => {
      //get
      state.needy = action.payload;
    },
    addNeedyCase: (state, action) => {
      //create
      state.needy.push(action.payload);
    },
    updateNeedyCase: (state, action) => {
      state.needy = state.needy.map((upNeedy, index) => {
        //update
        // console.log("updateNeedyCase",upNeedy);
        if (upNeedy.id === action.payload.id) {
          return action.payload;
        } else {
          return upNeedy;
        }
      });
    },
    deleteNeedyCase: (state, action) => {
      //delete
      state.needy = state.needy.filter((deNeedy, index) => {
        // console.log("deleteNeedyCase",deNeedy);
        return (deNeedy.id = action.payload);
      });
    },
    setNeedyId: (state, action) => {
      // console.log("action.payload", action.payload);
      state.setNeedyId = action.payload;
      //localStorage.setItem("setNeedyId", action.payload);
    },
    updateActive:(state, action)=>{
      state.needy=state.needy.map((elem,i)=>{
        if(elem.id==action.payload){
          return {...elem,statusdonation :'INactive'} 
        }

       return elem
      })

    },
  },
});

export const {
  setNeedyCase,
  addNeedyCase,
  updateNeedyCase,
  deleteNeedyCase,
  setNeedyId,
  updateActive,
} = needySlice.actions;

export default needySlice.reducer;
