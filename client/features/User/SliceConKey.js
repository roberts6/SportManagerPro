import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usuarios: [],  
};

const usuarioConKeySlice = createSlice({
    name: 'usuarios',  
    initialState,
    reducers: {
        setUsuarios(state, action) {
            state.usuarios = action.payload;  
        },
        clearUsuarios(state) {
            state.usuarios = [];  
        },
    },
});


export const { setUsuarios } = usuarioConKeySlice.actions;

export default usuarioConKeySlice.reducer;