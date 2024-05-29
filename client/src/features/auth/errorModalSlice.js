import {createSlice} from "@reduxjs/toolkit";

export const errorModalSlice = createSlice({
    name: 'errorModal',
    initialState: {
        value: false,
        error: '',
    },
    reducers: {
        errorShow: (state) => {
            state.value = true;
        },
        errorHide: (state) => {
            state.value = false;
        },
        setModalError: (state, action) => {
            state.error = action.payload;
        },
        getModalError: (state) => {
            return {...state, error: state.error};
        }
    },
});

export const { errorShow, errorHide, getModalError, setModalError } = errorModalSlice.actions;
export default errorModalSlice.reducer;