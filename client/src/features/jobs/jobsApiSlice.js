import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const jobsApiSlice = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (build) => ({
        createJob: build.mutation({
            query: (body) => {
                return {
                    url: "jobs",
                    method: "POST",
                    body,
                }
            }
        })
    })
});

export const { useCreateJobMutation } = jobsApiSlice;