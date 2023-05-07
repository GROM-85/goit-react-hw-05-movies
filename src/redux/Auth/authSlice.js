import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'auth',
    initialState:{
        user: {},
        isLoggedIn:false,
    },
    reducers:{
        LogIn(state,{payload}){
           state.isLoggedIn = true;
           
        },
        LogOut(state,{payload}){
            state.isLoggedIn = false;
        },
        setUser(state,{payload}){
            state.user = payload;
        }
    }
});
export default userSlice;
export const {LogIn,LogOut,setUser} = userSlice.actions;



