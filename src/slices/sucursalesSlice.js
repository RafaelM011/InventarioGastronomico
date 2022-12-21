import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'

const initialState = {
    items: [],
    sucursalSeleccionada: ''
}

const sucursalesSlice = createSlice({
    name: "sucursales",
    initialState,
    reducers: {
        changeSucursal(state, action) {
            state.sucursalSeleccionada = action.payload;
        },
        resetSucursalesState(state, action) {
            return initialState 
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchSucursales.fulfilled, (state, action) => {
                state.items = action.payload;
                state.sucursalSeleccionada = action.payload[0]?.name ?? '';
            })

            .addCase(addSucursal.fulfilled, (state, action) => {
                state.items = action.payload;
                state.sucursalSeleccionada = action.payload[action.payload.length-1]?.name ?? '';       
            })
    }
})

export const fetchSucursales = createAsyncThunk( 'sucursales/fetchSucursales', async (username, {rejectWithValue}) => {
    const response = await
    fetch(serverUrl + 'importsucursales', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username})
    })
    .then(res => res.json())
    return response;
})

export const addSucursal = createAsyncThunk( 'sucursales/addSucursal', async (data, {rejectWithValue}) => {
    const response = await
    fetch(serverUrl + 'addsucursal', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    return response;
})

export const { changeSucursal, resetSucursalesState } = sucursalesSlice.actions;
export const selectSucursales = state => state.sucursales;
export const selectSucursal = state => state.sucursales.sucursalSeleccionada;
export default sucursalesSlice.reducer;