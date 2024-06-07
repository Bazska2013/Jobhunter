import {createSlice} from "@reduxjs/toolkit";

const showApplicantModalSlice = createSlice({
    name: 'showApplicantModal',
    initialState: {
        show: false,
        data: {},
    },
    reducers: {
        showApplicant: (state) => {
            state.show = true;
        },
        hideApplicant: (state) => {
            state.show = false;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        getData: (state) => {
            return state.data;
        }
    }
});

export const {showApplicant, hideApplicant, setData, getData} = showApplicantModalSlice.actions;
export const selectShowApplicantModal = (state) => state.showApplicantModal.show;
export const showApplicantModalReducer = showApplicantModalSlice.reducer;
export default showApplicantModalSlice;