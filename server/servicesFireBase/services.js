import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bd_url } from '../FireBaseDB.js';

export const ApiJugadores = createApi({
    reducerPath: 'ApiJugadores',
    baseQuery: fetchBaseQuery({ baseUrl: bd_url }),
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
        getJugadoresByClub: builder.query({
            query: (clubId) => `Jugadores.json?orderBy="clubId"&equalTo="${clubId}"`
        }),
        getJugadorById: builder.query({
            query: (jugadorId) => `Jugadores.json?orderBy="id"&equalTo="${jugadorId}"`
        }),
        getJugadorByEmail: builder.query({
            query: (email) => `Jugadores.json?orderBy="email"&equalTo="${email}"`
        }),getEntrenadorByEmail: builder.query({
            query: (email) => `Entrenadores.json?orderBy="email"&equalTo="${email}"`
        }),getDelegadoByEmail: builder.query({
            query: (email) => `Delegados.json?orderBy="email"&equalTo="${email}"`
        }),
        getEntrenadorById: builder.query({
            query: (entrenadorId) => `Entrenadores.json?orderBy="id"&equalTo="${entrenadorId}"`
        }),
        getDelegadoById: builder.query({
            query: (delegadoId) => `Delegados.json?orderBy="id"&equalTo="${delegadoId}"`
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
        putJugador: builder.mutation({
            query: (jugador) => ({
                url: 'Jugadores.json',
                method: 'PUT',
                body: jugador
            }),
        })
    })
});

export const {
    useGetJugadoresQuery,
    useGetClubesQuery,
    useGetDelegadosQuery,
    useGetEntrenadoresQuery,
    useGetJugadorByIdQuery,
    useGetJugadoresByClubQuery,
    useGetDelegadoByIdQuery,
    useGetEntrenadorByIdQuery,
    useGetJugadorByEmailQuery,
    useGetDelegadoByEmailQuery,
    useGetEntrenadorByEmailQuery,
    usePostJugadorMutation,
    usePostEntrenadorMutation,
    usePostDelegadoMutation,
    usePutJugadorMutation,
} = ApiJugadores;
