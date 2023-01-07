import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let serverUrl;
process.env.NODE_ENV === 'production'?
 serverUrl = 'https://inventario-gastronomico-server-production.up.railway.app/':
  serverUrl = 'http://localhost:4050/';

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
    extraReducers(builder){


    }
});

export const ImportXLSX = createAsyncThunk('excel/ImportXLSX', async (file, rejectWithValue) => {
    console.log(file);
    const fd = new FormData();
    fd.append("file",file);
    const response = await
    fetch(serverUrl + 'ImportXLSX', {
        method: "post",
        //headers: {'Content-Type': 'application/json'},
        body: fd
    })
    .then( res =>{console.log("paso 2"); res.json();});
});
export const writeexcel = createAsyncThunk('excel/writeexcel', async (file, rejectWithValue) => {
    const response = await
    fetch(serverUrl + 'writeexcel')
    .then( res =>res.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);

    // Create a link element
    const a = document.createElement('a');
    // Set the link element's href to the object URL
    a.href = url;
    // Set the link element's download attribute
    a.download = 'file.xlsx';
    // Append the link element to the body
    document.body.appendChild(a);
    // Click the link element to download the file
    a.click();
    // Remove the link element
    document.body.removeChild(a);
    // Revoke the object URL
    URL.revokeObjectURL(url);
    });
});

export default excelSlice.reducer;