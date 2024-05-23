import {createSlice} from "@reduxjs/toolkit";

export const authorizedSlice = createSlice({
    name: 'authorized',
    initialState: {
        value: false,
    },
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
    },
});

export const { login, logout } = authorizedSlice.actions;
export default authorizedSlice.reducer;