import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bd_url } from '../FireBaseDB.js';

export const ApiJugadores = createApi({
    reducerPath: 'ApiJugadores',
    baseQuery: fetchBaseQuery({ baseUrl: bd_url }),
    endpoints: (builder) => ({
        getJugadores: builder.query({
            query: () => `Jugadores.json"` // Endpoint para la colección de jugadores
        }),
        getClubes: builder.query({
            query: () => `Clubes.json` // Endpoint para la colección de clubes
        }),
        getJugadoresByClub: builder.query({
            query: (clubId) => `Jugadores.json?orderBy="clubId"&equalTo="${clubId}"`
        }),
        getJugadorById: builder.query({
            query: (jugadorId) => `Jugadores.json?orderBy="id"&equalTo="${jugadorId}"`
        })
    })
});

export const {
    useGetJugadoresQuery,
    useGetClubesQuery,
    useGetJugadorByIdQuery,
    useGetJugadoresByClubQuery
} = ApiJugadores;
