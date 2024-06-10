import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:3030/";
const BASE_URL = "https://3030-bazska2013-jobhunter-extiulkjdh5.ws-eu114.gitpod.io/";

export const applicantsApiSlice = createApi({
    reducerPath: "applicantsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (build) => ({
        applyForJob: build.mutation({
            query: (body) => {
                return {
                    url: "applicants",
                    method: "POST",
                    body,
                }
            }
        }),
        applicantsForAJob: build.query({
            query: (params) => {
                return {
                    url: `applicants?${new URLSearchParams(params).toString()}`,
                    method: "GET",
                }
            }
        }),
        jobsForAnApplicant: build.query({
            query: (params) => {
                return {
                    url: `applicants?${new URLSearchParams(params).toString()}`,
                    method: "GET",
                }
            }
        }),
        deleteApplicationFromAJob: build.mutation({
            query: (params) => {
                return {
                    url: `applicants?${new URLSearchParams(params).toString()}`,
                    method: "DELETE",
                }
            }
        })
    })
});

export const { useApplyForJobMutation, useApplicantsForAJobQuery, useJobsForAnApplicantQuery, useDeleteApplicationFromAJobMutation } = applicantsApiSlice;