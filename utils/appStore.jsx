import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import conversationReducer from "./conversation";
import requestReducer from "./requestSlice"

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        conversation : conversationReducer,
        request : requestReducer,
    }
})

export default appStore;