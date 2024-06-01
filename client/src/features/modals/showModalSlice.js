import {createSlice} from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        show: false,
        message: '',
    },
    reducers: {
        show: (state) => {
            state.show = true;
        },
        hide: (state) => {
            state.show = false;
        },
        setSuccessMessage: (state, action) => {
            state.message = action.payload;
        },
        getSuccessMessage: (state) => {
            return state.message;
        }
    }
});

export const {show, hide, setSuccessMessage, getSuccessMessage} = showModalSlice.actions;
export const selectShowModal = (state) => state.showModal.show;
export const showModalReducer = showModalSlice.reducer;
export default showModalSlice;