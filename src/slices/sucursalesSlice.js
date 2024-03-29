import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production' 
    ? serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/'
    : serverUrl = 'http://localhost:4000/'

const initialState = {
    items: [],
    sucursalSeleccionada: '',
    status: '',
    message: ''
}

const sucursalesSlice = createSlice({
    name: "sucursales",
    initialState,
    reducers: {
        changeSucursal(state, action) {
            state.sucursalSeleccionada = action.payload;
        },
        sucursalesMessage(state,action){
            state.message = action.payload;
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
            .addCase(fetchSucursales.rejected, (state, action) => {
                state.status = 'rejected'
                state.message = action.payload;
            })
            .addCase(addSucursal.fulfilled, (state, action) => {
                state.items = action.payload;
                state.sucursalSeleccionada = action.payload[action.payload.length-1]?.name ?? '';  
                state.message = 'Sucursal added properly'     
            })
            .addCase(addSucursal.rejected, (state, action) => {
                state.status = 'rejected'
                state.message = action.payload;
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
    if (typeof response === 'string') return rejectWithValue(response);
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
    if (typeof response === 'string') return rejectWithValue(response);
    return response;
})

export const { changeSucursal, resetSucursalesState, sucursalesMessage } = sucursalesSlice.actions;
export const selectSucursales = state => state.sucursales;
export const selectSucursal = state => state.sucursales.sucursalSeleccionada;
export const selectSucursalesMessage = state => state.sucursales.message;
export default sucursalesSlice.reducer;