import { configureStore } from "@reduxjs/toolkit";
import { ApiJugadores } from "../servicesFireBase/services";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer:{
        [ApiJugadores.reducerPath] : ApiJugadores.reducer // configuración para traer los datos generados en services.js
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiJugadores.middleware) // llamada al middleware. Necesario para ejecutar la llamada de información de firebase 
});

setupListeners(store.dispatch) //dispara el reducer

export default store; // para poder importarlo dentro del Provider en App.js