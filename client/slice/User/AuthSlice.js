import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth", // nombre para poder acceder al estado en otro componente
    initialState:{
        value: {
            user: null,
            token: null,
            localId: null, // para identificar la foto que se agregue 
            imageCamera: null
        }
    },
    reducers: { // acá van las acciones que quiero que modifique el initialState 
        setUser: (state, {payload}) => { // recibe estado y acción. La acción dentro tiene el payload de la acción que ha sido despachada (los datos). En este caso está desestructurado
            state.value.user = payload.email, //modifica directamente el estado inicial 
            state.value.token = payload.idToken, 
            state.value.localId = payload.localId
        },
        clearUser: (state) => {
            state.value.user = null,
            state.value.token = null
        },
        setCameraImage: (state, action ) => {
            state.value = {
                ...state.value, // toma todo el state y le agrega un nuevo valor a imageCamera
                imageCamera: action.payload
            }
        }
    }
})


export const {setUser, clearUser, setCameraImage} = authSlice.actions;
export default authSlice.reducer;