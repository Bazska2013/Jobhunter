import {configureStore} from "@reduxjs/toolkit";
import authorizedReducer from "./features/auth/authorizedSlice";
import loginModalReducer from "./features/auth/loginModalSlice";
import logoutModalReducer from "./features/auth/logoutModalSlice";
import registerReducer from "./features/auth/registerSlice";
import errorModalReducer from "./features/auth/errorModalSlice";

export default configureStore({
    reducer: {
        authorized: authorizedReducer,
        loginModal: loginModalReducer,
        logoutModal: logoutModalReducer,
        register: registerReducer,
        errorModal: errorModalReducer,
    },
});