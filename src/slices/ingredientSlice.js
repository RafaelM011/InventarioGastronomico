import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addIngredient.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async (sucursal, {rejectWithValue}) => {
    const response = await 
    fetch('http://localhost:4000/importingredientes', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
    })
    .then(res => res.json())
    return response;
})

export const addIngredient = createAsyncThunk('ingredients/addIngredient', async (ingredientInfo, rejectWithValue) => {
    const response = await
    fetch('http://localhost:4000/agregaringrediente', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientInfo)
    })
    .then(res => res.json())
    return response;
})

export const selectIngredients = state => state.ingredients;
export default ingredientsSlice.reducer;