import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'
    
const initialState = {
    items: [],
    status: 'idle',
    message: '',
    error: ''
};

const platosSlice = createSlice({
    name: "platos",
    initialState,
    reducers: {
        dishMessage(state,action){
            state.message = action.payload;
        },
        resetDishState(state, action) {
            return initialState 
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchDishes.fulfilled, (state,action) => {
                state.items = action.payload;
            })
            .addCase(AddDish.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Dish added succesfully'
            })
            .addCase(UpdateDishes.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Dish updated succesfully'
            })
            .addCase(fetchDishes.rejected, (state,action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(AddDish.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(UpdateDishes.rejected, (state, action) => {
                state.status = 'rejected';
                state.message = action.payload;
            })
            
            
    }
})

export const fetchDishes = createAsyncThunk('platos/fetchdishes', async (info, {rejectWithValue}) => {
    const response = await
    fetch(serverUrl + 'fetchdishes', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    if (typeof response === 'string') return rejectWithValue(response);
    return response;
})

export const AddDish = createAsyncThunk('platos/adddish',async (plate, {rejectWithValue}) => {
    const response = await
    fetch(serverUrl + 'adddish',{
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(plate)
    })
    .then(res => res.json())
    if (typeof response === 'string') return rejectWithValue(response);
    return response
})

export const UpdateDishes = createAsyncThunk('platos/updatedishes', async (dishes, rejectWithValue) => {
    const response = await 
    fetch(serverUrl + 'updatedishes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dishes)
    })
    .then(res => res.json())
    if (typeof response === 'string') return rejectWithValue(response);
    return response;
})

export const {AddNewPlate,dishMessage, resetDishState} = platosSlice.actions;
export const selectDishes = state => state.dishes.items;
export const selectDishMessage = state => state.dishes.message;
export default platosSlice.reducer;