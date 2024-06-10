import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:3030/";
const BASE_URL = "https://3030-bazska2013-jobhunter-extiulkjdh5.ws-eu114.gitpod.io/";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (body) => {
                return {
                    url: "users",
                    method: "POST",
                    body,
                }
            }
        }),
        login: build.mutation({
            query: (body) => {
                return {
                    url: "authentication",
                    method: "POST",
                    body,
                }
            }
        })
    })
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;