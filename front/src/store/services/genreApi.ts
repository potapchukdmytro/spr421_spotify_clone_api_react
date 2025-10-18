import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../env';
import type { ServiceResponse } from './types';

export const genreApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    tagTypes: ['genres'],
    reducerPath: "genre",
    endpoints: (build) => ({
        getGenres: build.query<ServiceResponse, null>({
            query: () => ({
                url: 'genre',
                method: 'get'
            }),
            providesTags: ['genres']
        })
   })
});

export const { useGetGenresQuery } = genreApi;