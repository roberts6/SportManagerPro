import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bd_url } from '../FireBaseDB.js';

export const ApiJugadores = createApi({
    reducerPath: 'ApiJugadores',
    baseQuery: fetchBaseQuery({ baseUrl: bd_url }),
    tagTypes: ['profileImageGet', 'direccionGet'],
    endpoints: (builder) => ({
        getJugadores: builder.query({
            query: () => `Jugadores.json` // Endpoint para la colección de jugadores
        }),
        getClubes: builder.query({
            query: () => `Clubes.json` // Endpoint para la colección de clubes
        }),
        getEntrenadores: builder.query({
            query: () => `Entrenadores.json` // Endpoint para la colección de Entrenadores
        }),
        getDelegados: builder.query({
            query: () => `Delegados.json` // Endpoint para la colección de Delegados
        }),
        getJugadorByEmail: builder.query({
            query: (email) => `Jugadores.json?orderBy="email"&equalTo="${email}"`
        }),getEntrenadorByEmail: builder.query({
            query: (email) => `Entrenadores.json?orderBy="email"&equalTo="${email}"`
        }),getDelegadoByEmail: builder.query({
            query: (email) => `Delegados.json?orderBy="email"&equalTo="${email}"`
        }),
        // foto perfil 
        getFotoPerfil: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        // agrega o cambia la foto de perfil 
        postFotoPerfil: builder.mutation({
            query:({fotoPerfil, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: 'PUT',
                body: {
                    Image: fotoPerfil
                }
            }),
            invalidatesTags: ['profileImageGet'] // invalida que la búsqueda de la imagen sea desde el catche y lo hace desde la BD
        }),
        // dirección 
        getDireccion: builder.query({
            query: (localId) => `direcciones/${localId}.json`,
            providesTags: ['direccionGet']
        }),
        // agrega o cambiar la dirección
        postDireccion: builder.mutation({
            query:({location, localId}) => ({
                url: `direcciones/${localId}.json`,
                method: 'PUT',
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    direccion: location.direccion,
                    modificado: location.modificado
                }
            }),
            invalidatesTags: ['direccionGet'] // invalida que la búsqueda de la dirección sea desde el catche y lo hace desde la BD
        }),
                postJugador: builder.mutation({
            query: (jugador) => ({
                url: 'Jugadores.json',
                method: 'POST',
                body: jugador
            }),
        }),
        postDelegado: builder.mutation({
            query: (delegado) => ({
                url: 'Delegados.json',
                method: 'POST',
                body: delegado
            }),
        }),
        postEntrenador: builder.mutation({
            query: (entrenador) => ({
                url: 'Entrenadores.json',
                method: 'POST',
                body: entrenador
            }),
        }),
        putJugadorId: builder.mutation({
            query: (datosUsuario, localId) => ({
                url: `Jugadores/${localId}.json`,
                method: 'PUT',
                body: datosUsuario
            }),
        }),
        putEntrenadorId: builder.mutation({
            query: ({datosUsuario, localId}) => ({
                url: `Entrenadores/${localId}.json`,
                method: 'PUT',
                body: datosUsuario
            }),
        }),
        putDelegadoId: builder.mutation({
            query: ({datosUsuario, localId}) => ({
                url: `Delegados/${localId}.json`,
                method: 'PUT',
                body: datosUsuario
            }),
        }),
    })
});

export const {
    useGetJugadoresQuery,
    useGetClubesQuery,
    useGetDelegadosQuery,
    useGetEntrenadoresQuery,
    useGetJugadorByEmailQuery,
    useGetDelegadoByEmailQuery,
    useGetEntrenadorByEmailQuery,
    usePostJugadorMutation,
    usePostEntrenadorMutation,
    usePostDelegadoMutation,
    usePutJugadorIdMutation,
    usePutDelegadoIdMutation,
    usePutEntrenadorIdMutation,
    useGetFotoPerfilQuery,
    usePostFotoPerfilMutation,
    useGetDireccionQuery,
    usePostDireccionMutation
} = ApiJugadores;
