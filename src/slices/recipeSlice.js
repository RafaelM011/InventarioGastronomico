import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'

const initialState = {
    items: [],
    newItem: {
        ingredientes: [],
        cantidades: []
    },
    status: '',
    message: ''
}

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        createNewRecipe(state, action){
            const {id} = action.payload;
            if (id >= state.newItem.ingredientes.length){
                state.newItem.ingredientes.push('');
                state.newItem.cantidades.push('');
            }
        },
        updateNewRecipe(state,action){
            const {id,name,value} = action.payload;
            name  === 'ingrediente'
            ? state.newItem.ingredientes[id] = value
            : state.newItem.cantidades[id] = value

            state.message = '';
        },
        addRefAmount(state, action){
            for (let i = 0; i < state.items.length; i++){
                if (state.items[i].id === action.payload.id) state.items[i].refAmount = parseInt(action.payload.refAmount)                
            }
        },
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

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (sucursal, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'getrecipes', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
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
export const { addRefAmount, resetRecipeState, recipeMessage, createNewRecipe, updateNewRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;