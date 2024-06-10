import {createSlice} from "@reduxjs/toolkit";

const ShowModifyExperiencesModalSlice = createSlice({
    name: 'showModifyExperiencesModal',
    initialState: {
        show: false,
        data: {},
    },
    reducers: {
        showModifyExperiences: (state) => {
            state.show = true;
        },
        hideModifyExperiences: (state) => {
            state.show = false;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        getData: (state) => {
            return state.data;
        },
    }
});

export const {showModifyExperiences, hideModifyExperiences, setData, getData} = ShowModifyExperiencesModalSlice.actions;
export const showModifyExperiencesModalReducer = ShowModifyExperiencesModalSlice.reducer;