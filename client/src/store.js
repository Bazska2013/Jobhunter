import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features/auth/authSlice.js";
import {authApiSlice} from "./features/auth/authApiSlice.js";
import {jobsApiSlice} from "./features/jobs/jobsApiSlice.js";
import {showModalReducer} from "./features/modals/showModalSlice.js";
import {applicantsApiSlice} from "./features/jobs/applicantsApiSlice.js";
import {showApplicantModalReducer} from "./features/modals/showApplicantModalSlice.js";
import {experiencesApiSlice} from "./features/jobs/experiencesApiSlice.js";
import {showModifyExperiencesModalReducer} from "./features/modals/showModifyExperiencesModalSlice.js";
import {showNewExperiencesModalReducer} from "./features/modals/showNewExperiencesModalSlice.js";

export default configureStore({
    reducer: {
        auth: authReducer,
        showModal: showModalReducer,
        showApplicantModal: showApplicantModalReducer,
        showModifyExperiencesModal: showModifyExperiencesModalReducer,
        showNewExperiencesModal: showNewExperiencesModalReducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
        [applicantsApiSlice.reducerPath]: applicantsApiSlice.reducer,
        [experiencesApiSlice.reducerPath]: experiencesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware, jobsApiSlice.middleware, applicantsApiSlice.middleware, experiencesApiSlice.middleware),
});