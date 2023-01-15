import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'

const initialState = {
    items: [],
    status: '',
    message: ''
}

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        recipeMessage(state,action){
            state.message = action.payload;
        },
        resetRecipeState(state, action) {
            return initialState 
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Recipe added succesfully';
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Recipe updated succesfully';
            })
    }
})

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (info, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'getrecipes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    .then( res => res.json())
    return response
})

export const addRecipe = createAsyncThunk('recipes/addRecipe', async (recipe, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'addrecipe', {
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipe)
    })
    .then( res => res.json())
    return response;
})

export const updateRecipe = createAsyncThunk('recipes.updateRecipe', async (recipe, rejectWithValue) => {
    const response = await 
    fetch(serverUrl + 'updaterecipe', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipe)
    })
    .then(res => res.json())

    return response;
})

export const selectRecipes = state => state.recipes.items;
export const selectNewRecipe = state => state.recipes.newItem;
export const selectRecipeMessage = state => state.recipes.message;
export const { resetRecipeState, recipeMessage, createNewRecipe, updateNewRecipe, cleanNewRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;