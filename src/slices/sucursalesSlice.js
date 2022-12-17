import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchSucursales.fulfilled, (state, action) => {
                state.items = action.payload;
                state.sucursalSeleccionada = action.payload[0].name;
            })
    }
})

export const fetchSucursales = createAsyncThunk( 'sucursales/fetchSucursales', async (username, {rejectWithValue}) => {
    const response = await
    fetch('http://localhost:4000/importsucursales', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username})
    })
    .then(res => res.json())
    return response;
})

export const { changeSucursal } = sucursalesSlice.actions;
export const selectSucursales = state => state.sucursales;
export const selectSucursal = state => state.sucursales.sucursalSeleccionada;
export default sucursalesSlice.reducer;