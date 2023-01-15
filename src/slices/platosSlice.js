import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'
    
const initialState = {
    items: [],
    newItem: {
        usuario: '',
        sucursal: '',
        nombre: '',
        ingredientes: [],
        recetas: [],
    },
    status: 'idle',
    error: ''
};

const platosSlice = createSlice({
    name: "platos",
    initialState,
    reducers: {
        AddNewPlate(state,action){
            
        }
    },
    extraReducers(builder){
        builder
            .addCase(AddDish.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            
    }
})

export const AddDish = createAsyncThunk('platos/adddish',async (plate, {rejectWithValue}) => {
    const response = await
    fetch(serverUrl + 'adddish',{
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(plate)
    })
    .then(res => res.json())
    return response
})

export const {AddNewPlate} = platosSlice.actions;
export default platosSlice.reducer;