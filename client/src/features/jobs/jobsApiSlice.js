import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://3030-bazska2013-jobhunter-extiulkjdh5.ws-eu114.gitpod.io/";

export const jobsApiSlice = createApi({
    reducerPath: "jobsApi",
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
        createJob: build.mutation({
            query: (body) => {
                return {
                    url: "jobs",
                    method: "POST",
                    body,
                }
            }
        }),
        allJobs: build.query({
            query: () => {
                return {
                    url: "jobs",
                    method: "GET",
                }
            }
        }),
        filterJobs: build.query({
            query: (params) => {
                return {
                    url: `jobs?${new URLSearchParams(params).toString()}`,
                    method: "GET",
                }
            }

        }),
        oneJob: build.query({
            query: (id) => {
                return {
                    url: `jobs/${id}`,
                    method: "GET",
                }
            }
        })
    })
});

export const { useCreateJobMutation, useAllJobsQuery, useFilterJobsQuery, useOneJobQuery } = jobsApiSlice;