import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        value: {
            user: null,
            token: null,
            localId: null, // para identificar la foto que se agregue 
            imageCamera: null
        }
    },
    reducers: {
        setUser: (state, {payload}) => {
            // state.value.id = payload.id, // probando insertar id
            state.value.user = payload.email,
            state.value.token = payload.idToken 
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