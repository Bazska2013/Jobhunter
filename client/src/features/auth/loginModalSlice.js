import {createSlice} from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
    name: 'loginModal',
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

export const { show, hide } = loginModalSlice.actions;
export default loginModalSlice.reducer;