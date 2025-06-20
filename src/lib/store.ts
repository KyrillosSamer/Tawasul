import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postReducer } from "./postSlice";
import { commentReducer } from "./commentSlice";

export let store = configureStore({
//slices 
    reducer:{
        auth : authReducer ,
        post : postReducer ,
        comment: commentReducer,
    }
})

export type stateType  = ReturnType<typeof store.getState> 
export type dispatchType = typeof store.dispatch