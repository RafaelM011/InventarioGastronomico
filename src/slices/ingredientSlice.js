import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        decreaseQuantity(state, action){
            // UPDATE QUANTITY OF EACH INGREDIENT ON PAYLOAD BY RESPECTIVE AMOUNT ON PAYLOAD
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addIngredient.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(decreaseIngredient.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(updateIngredients.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async (sucursal, rejectWithValue) => {
    const response = await 
    fetch('inventario-gastronomico-server-production.up.railway.app/importingredientes', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
    })
    .then(res => res.json())
    return response;    
})

export const addIngredient = createAsyncThunk('ingredients/addIngredient', async (ingredientInfo, rejectWithValue) => {
    const response = await
    fetch('inventario-gastronomico-server-production.up.railway.app/agregaringrediente', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientInfo)
    })
    .then(res => res.json())
    return response;
})

export const decreaseIngredient = createAsyncThunk('ingredients/decreaseIngredient', async (ingredientsInfo, rejectWithValue) => {
    const response = await
    fetch('inventario-gastronomico-server-production.up.railway.app/decreaseingredient', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientsInfo)
    })
    .then(res => res.json())
    return response;
})

export const updateIngredients = createAsyncThunk('ingredients/updateIngredients', async (ingredients, rejectWithValue) => {
    const response = await
    fetch('inventario-gastronomico-server-production.up.railway.app/updateingredients', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients})
    })
    .then(res => res.json())
    return response;
})

export const selectIngredients = state => state.ingredients;
export const { decreaseQuantity } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;