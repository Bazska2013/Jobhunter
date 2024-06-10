import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, {payload: {user, accessToken: token}}) => {
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;