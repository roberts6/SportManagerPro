import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseAuthUrl, apiKey } from '../usersFirebase';


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