import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:3030/";
const BASE_URL = "https://3030-bazska2013-jobhunter-extiulkjdh5.ws-eu114.gitpod.io/";

export const experiencesApiSlice = createApi({
    reducerPath: 'experiencesApi',
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
        getExperiences: build.query({
            query: () => {
                return {
                    url: "experiences",
                    method: "GET",
                }
            }
        }),
        addExperiences: build.mutation({
            query: (body) => {
                return {
                    url: "experiences",
                    method: "POST",
                    body,
                }
            }
        }),
        modifyExperience: build.mutation({
            query: ({body, id}) => {
                return {
                    url: `experiences/${id}`,
                    method: "PATCH",
                    body,
                }
            }
        }),
        deleteExperience: build.mutation({
            query: (id) => {
                return {
                    url: `experiences/${id}`,
                    method: "DELETE",
                }
            }
        }),
        deleteExperiences: build.mutation({
            query: () => {
                return {
                    url: "experiences",
                    method: "DELETE",
                }
            }
        })
    })
})

export const { useGetExperiencesQuery, useAddExperiencesMutation, useModifyExperienceMutation, useDeleteExperienceMutation, useDeleteExperiencesMutation } = experiencesApiSlice;