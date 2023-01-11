import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'


const initialState = {
    items: [],
    newItems: [],
    status: '',
    message: ''
};

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        createNewItem(state,action){
            const {id, sucursal} = action.payload;
            if (!state.newItems[id]){
                state.newItems[id] = {
                    id,
                    sucursal,
                    nombre: '',
                    precio: null,
                    cantidad: null,
                    unidad: ''
                };
            }
        },
        addNewItem(state,action) {
            const {id,name,value} = action.payload;
            switch (name) {
                case 'nombre':
                    state.newItems[id].nombre = value;
                break;
                case 'precio':
                    state.newItems[id].precio = value;
                    break;
                case 'cantidad':
                    state.newItems[id].cantidad = value;
                    break;
                case 'unidad':
                    state.newItems[id].unidad = value;
                    break;
                default:
            }
        },
        ingredientMessage(state, action){
            state.message = action.payload;
        },
        resetIngredientState(state, action) {
            return initialState 
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addIngredient.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'fulfilled';
                state.message = 'Ingredient(s) added succesfully';
            })
            .addCase(decreaseIngredient.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Sale(s) reported properly'
            })
            .addCase(updateIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
                state.message = 'Ingredient(s) updated succesfully'
            })
    }
})

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async (sucursal, rejectWithValue) => {
    const response = await 
    fetch(serverUrl + 'importingredientes', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sucursal})
    })
    .then(res => res.json())
    return response;    
})

export const addIngredient = createAsyncThunk('ingredients/addIngredient', async (ingredientInfo, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'agregaringrediente', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientInfo)
    })
    .then(res => res.json())
    return response;
})

export const decreaseIngredient = createAsyncThunk('ingredients/decreaseIngredient', async (ingredientsInfo, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'decreaseingredient', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ingredientsInfo)
    })
    .then(res => res.json())
    return response;
})

export const updateIngredients = createAsyncThunk('ingredients/updateIngredients', async (data, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'updateingredients', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    return response;
})

export const selectIngredients = state => state.ingredients.items;
export const selectNewIngredients = state => state.ingredients.newItems;
export const selectIngredientMessage = state => state.ingredients.message;
export const { resetIngredientState,createNewItem,addNewItem, ingredientMessage } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;