import {createSlice} from "@reduxjs/toolkit";

export const logoutModalSlice = createSlice({
    name: 'logoutModal',
    initialState: {
        value: false,
    },
    reducers: {
        show: (state) => {
            state.value = true;
        },
        hide: (state) => {
            state.value = false;
        },
    },
});

export const { show, hide } = logoutModalSlice.actions;
export default logoutModalSlice.reducer;