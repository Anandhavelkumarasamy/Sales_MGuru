import { createSlice } from "@reduxjs/toolkit"

// import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:'',
    dealeruserList:null,
    resetkey:null,
    leadsdata:[],
}
// const logintoken=createSlice({
//     name:'authtoken',
//     initialState,
//     reducers:{
//         handleStorage:(state,action)=>{
//             state.token=action.payload;
//         }
//     }
// })
// export const{handleStorage}=logintoken.actions;
// export default logintoken.reducer;


const {actions,reducer} = createSlice({
    name:"authLogin",
    initialState,
    reducers:{
        handleStorage:(state,action) => {
            state.token = action.payload
        },
        handleDealeruserlist:(state,action)=>{
            state.dealeruserList=action.payload;
        },
        handleresetkey:(state,action)=>{
            state.resetkey=action.payload;
        },
        handleleadsdata:(state,action)=>{
            state.leadsdata=action.payload;
        }
    }
})

export const {handleStorage,handleDealeruserlist,handleresetkey,handleleadsdata} = actions

export default reducer