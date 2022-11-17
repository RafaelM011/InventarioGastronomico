import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = []

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {

    }
})

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (sucursal, rejectWithValue) => {
    const response = await
    fetch('http://localhost:4000/getrecipes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(sucursal)
    })
    console.log(response);
})

export default recipeSlice.reducer;