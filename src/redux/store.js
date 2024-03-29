import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";

const store = configureStore({
    reducer: {
        userReducer: userSlice
    }
})

export default store;