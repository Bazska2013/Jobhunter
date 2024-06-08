import {createSlice} from "@reduxjs/toolkit";

const ShowNewExperiencesModalSlice = createSlice({
    name: 'showNewExperiencesModal',
    initialState: {
        show: false,
        data: null,
    },
    reducers: {
        showNewExperiences: (state) => {
            state.show = true;
        },
        hideNewExperiences: (state) => {
            state.show = false;
        },
        setExperienceData: (state, action) => {
            state.data = action.payload;
        },
        getExperienceData: (state) => {
            return state.data;
        },
    }
});

export const {showNewExperiences, hideNewExperiences, setExperienceData, getExperienceData} = ShowNewExperiencesModalSlice.actions;
export const selectShowNewExperiencesModal = (state) => state.showNewExperiencesModal.show;
export const showNewExperiencesModalReducer = ShowNewExperiencesModalSlice.reducer;
export default ShowNewExperiencesModalSlice;