import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    info: {
        id: null,
        username: '',
        email: ''
    },
    status: 'idle',
    error: ''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.info = action.payload;
                state.status = 'completed';
                state.error = '';
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.info = action.payload;
                state.status = 'completed';
                state.error = '';
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async (user, {rejectWithValue}) => {
    const response = await 
    fetch('http://localhost:4000/signin',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then( res => res.json())
    if (typeof response === 'string') return rejectWithValue(response);
    return response
})

export const registerUser = createAsyncThunk('user/registerUser', async (user, {rejectWithValue}) => {
    const response = await
    fetch('http://localhost:4000/register',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    return response;
})

export const selectUser = state => state.user;
export default userSlice.reducer;