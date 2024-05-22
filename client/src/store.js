import {configureStore} from "@reduxjs/toolkit";
import authorizedReducer from "./features/auth/authorizedSlice";

export default configureStore({
    reducer: {
        authorized: authorizedReducer,
    },
});