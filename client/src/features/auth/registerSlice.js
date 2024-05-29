import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const sendData = createAsyncThunk(
    'register/sendData',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const user = {
            email: state.register.email,
            password: state.register.password,
            fullname: state.register.fullname,
            role: state.register.role,
        };
        try {
            const response = await axios.post('http://localhost:3030/users/register', user);
            return { payload: '' }; // return an object with an empty payload property
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        email: '',
        password: '',
        fullname: '',
        role: '',
        error: '',
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setName: (state, action) => {
            state.fullname = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        getError: (state) => {
            return state.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendData.fulfilled, (state, action) => {
                state.error = { payload: ''};
            })
            .addCase(sendData.rejected, (state, action) => {
                if (action.payload.message.includes('UNIQUE constraint failed: users.email')) {
                    state.error = { payload: "Ezzel az e-mail címmel már regisztráltak fiókot" };
                } else {
                    state.error = { payload: action.payload.message };
                }
            });
    }
});

export const { setEmail, setPassword, setName, setRole, getError } = registerSlice.actions;
export default registerSlice.reducer;