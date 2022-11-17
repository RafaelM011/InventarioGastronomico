import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = []

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (sucursal, rejectWithValue) => {
    const response = await
    fetch('http://localhost:4000/getrecipes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
    })
    .then( res => res.json())
    return response
})

export const selectRecipes = state => state.recipes;
export default recipeSlice.reducer;