import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const register = createAsyncThunk('/register', async (data) => {
    const response = await axios.post('/register', data);
    return response.data;
});

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        email: '',
        password: '',
        fullname: '',
        role: '',
        status: 'idle',
        error: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setFullname: (state, action) => {
            state.fullname = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setEmail, setPassword, setFullname, setRole } = registerSlice.actions;
export default registerSlice.reducer;