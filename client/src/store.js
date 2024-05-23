import {configureStore} from "@reduxjs/toolkit";
import authorizedReducer from "./features/auth/authorizedSlice";
import loginModalReducer from "./features/auth/loginModalSlice";
import logoutModalReducer from "./features/auth/logoutModalSlice";

export default configureStore({
    reducer: {
        authorized: authorizedReducer,
        loginModal: loginModalReducer,
        logoutModal: logoutModalReducer,
    },
});