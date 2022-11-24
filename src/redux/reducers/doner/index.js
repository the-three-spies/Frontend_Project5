import { createSlice } from "@reduxjs/toolkit";
const donerSlice=createSlice({
    name:"donation",
    initialState:{
        dontionthings :[],
        moneyDonation:[],
        cateagory:[]

    },
    reducers:{
        setDonationThing:(state,action)=>
        {
            state.dontionthings=action.payload
        },
        addDonationThingOrder:(state,action)=>
        {
            state.donation.push(action.payload)
        },
        updatDonationThingOrder:(state,action)=>
        {
            state.dontionthings=state.dontionthings.map((element,i)=>
            {
                if( element.id===action.payload.id)
                {


                    return ({...element,deleverydate:action.payload.newdate})

                }
                return element
            })

        },
        deletethingOrder:(state,action)=>
        {
            state.dontionthings=state.dontionthings.filter((element,i)=>
            {
                return element.id !== action.payload;
            })
       
    },
    setDonationMoney:(state,action)=>
        {
            state.moneyDonation=action.payload
        },
        addDonationMoneyOrder:(state,action)=>
        {
            state.moneyDonation.push(action.payload)
        },
        deleteMoneyoderr:(state,action)=>
        {
            state.moneyDonation=state.moneyDonation.filter((element,i)=>
            {
                return element.id !== action.payload;
            })
       
    },
    setIDCateogory:(state,action)=>
    {
        state.cateagory=action.payload
    },
}
})
export const {setDonationThing,addDonationThingOrder,updatDonationThingOrder,deletethingOrder,setDonationMoney,addDonationMoneyOrder,deleteMoneyoderr,setIDCateogory}=donerSlice.actions
export default donerSlice.reducer