import { configureStore } from "@reduxjs/toolkit";
import { ApiJugadores } from "../servicesFireBase/services";
import { AuthApi } from "../servicesFireBase/credencialesApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import planillaJugadoresSlice from "../../client/features/planillaJugadores/planillaJugadores";
import authReducer from '../../client/features/User/UserSlice.js'
import usuarioReducer from "../../client/features/User/SliceConKey.js";

const store = configureStore({
    reducer:{
        planilla: planillaJugadoresSlice,
        auth: authReducer,
        usuarios: usuarioReducer, 
        [ApiJugadores.reducerPath] : ApiJugadores.reducer, // configuración para traer los datos generados en services.js. CRUD
        [AuthApi.reducerPath] : AuthApi.reducer // registro y login
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(ApiJugadores.middleware) // llamada al middleware. Necesario para ejecutar la llamada de información de firebase 
    .concat(AuthApi.middleware) 
});

setupListeners(store.dispatch) //dispara el reducer

export default store; // para poder importarlo dentro del Provider en App.js