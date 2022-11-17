import { createSlice } from "@reduxjs/toolkit";
const donerSlice=createSlice({
    name:"donation",
    initialState:{
        donation:[],
        cateagory:[]
    },
    reducers:{
        setDonationOrder:(state,action)=>
        {
            state.donation=action.payload
        },
        addDonationOrder:(state,action)=>
        {
            state.donation.push(action.payload)
        },
        updatDonationOrder:(state,action)=>
        {
            state.donation=state.donation.map((element,i)=>
            {
                if( element.id===action.payload.id)
                {


                    return ({...element,deleverydate:action.payload.newdate})

                }
                return element
            })

        },
        deleteDonationOrder:(state,action)=>
        {
            state.donation=state.donation.filter((element,i)=>
            {
                return element.id !== action.payload;
            })
        },
        setNeedcase:(state,action)=>
        {
            state.donation=action.payload
        },
        setIDCateogory:(state,action)=>
        {
            state.cateagory=action.payload
        },
        setMoneyDonation:(state,action)=>
        {
            state.donation=state.donation.filter((element,i)=>
            {
                return element.category_id=='3'
            })
        },
        setMaterialDonation:(state,action)=>
        {
            state.donation=state.donation.filter((element,i)=>
            {
                return element.category_id!=='3'
            })
        },
    }
})
export const {setDonationOrder,addDonationOrder,updatDonationOrder,deleteDonationOrder,setMoneyDonation,setIDCateogory,setMaterialDonation}=donerSlice.actions
export default donerSlice.reducer