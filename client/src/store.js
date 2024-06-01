import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice.js";
import {authApiSlice} from "./features/auth/authApiSlice.js";
import {jobsApiSlice} from "./features/jobs/jobsApiSlice.js";
import {showModalReducer} from "./features/modals/showModalSlice.js";

export default configureStore({
    reducer: {
        auth: authReducer,
        showModal: showModalReducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware, jobsApiSlice.middleware),
});