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



//reporte de cosas en el inv
const excelSlice = createSlice({
    name: "excel",
    initialState,
    reducers: {

    },
    extraReducers(builder){}
})

export default excelSlice.reducer;