import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = []

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRefAmount(state, action){
            for (let i = 0; i < state.length; i++){
                if (state[i].id === action.payload.id)  state[i].refAmount = parseInt(action.payload.refAmount)                
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(updateRecipe.fulfilled, (status, action) => {
                return action.payload;
            })
    }
})

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (sucursal, rejectWithValue) => {
    const response = await
    fetch('inventario-gastronomico-server-production.up.railway.app/getrecipes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
    })
    .then( res => res.json())
    return response
})

export const addRecipe = createAsyncThunk('recipes/addRecipe', async (recipe, rejectWithValue) => {
    const response = await
    fetch('inventario-gastronomico-server-production.up.railway.app/addrecipe', {
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipe)
    })
    .then( res => res.json())

    return response;
})

export const updateRecipe = createAsyncThunk('recipes.updateRecipe', async (recipe, rejectWithValue) => {
    const response = await 
    fetch('inventario-gastronomico-server-production.up.railway.app/updaterecipe', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipe)
    })
    .then(res => res.json())

    return response;
})

export const selectRecipes = state => state.recipes;
export const { addRefAmount } = recipeSlice.actions;
export default recipeSlice.reducer;