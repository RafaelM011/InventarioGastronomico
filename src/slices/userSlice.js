import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'
    
const initialState = {
    info: {
        id: null,
        username: '',
        email: '',
        selectedMenu: 1
    },
    status: 'idle',
    error: ''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        idleStatus(state, action){
            state.status = 'idle';
        },
        resetUserState(state, action) {
            return initialState 
        },
        changeActiveMenu(state,action){
            state.info.selectedMenu = action.payload;
        }
    },
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
    fetch(serverUrl + 'signin',{
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
    fetch(serverUrl + 'register',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    if (typeof response === 'string') return rejectWithValue(response);
    return response;
})

export const { idleStatus, resetUserState, changeActiveMenu } = userSlice.actions;
export const selectUser = state => state.user;
export const selectError = state => state.user.error;
export const selectActiveMenu = state => state.user.info.selectedMenu;
export default userSlice.reducer;