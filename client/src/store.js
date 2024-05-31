import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice.js";
import {authApiSlice} from "./features/auth/authApiSlice.js";

export default configureStore({
    reducer: {
        auth: authReducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware),
});