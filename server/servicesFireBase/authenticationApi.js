import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseAuthUrl, apiKey } from '../servicesFireBase/authenticationApi.js';


export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signUp?key=${apiKey}`, // esto se le suma a la url que trae "baseAuthUrl" para generar el endpoint final
                method: 'POST',
                body: auth
            })
        }),
        // signUp: builder.mutation({
        //     query: ({email, password}) => ({
        //         url: `/accounts:signUp?key=${apiKey}`, // esto se le suma a la url que trae "baseAuthUrl" para generar el endpoint final
        //         method: 'POST',
        //         body: {
        //             email, 
        //             password,
        //             returnSecureToken
        //         }
        //     })
        // }),
        signIn: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signInWithPassword?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
    })
});

export const {
    useSignUpMutation,
    useSignInMutation
} = AuthApi;