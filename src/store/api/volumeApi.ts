import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {Books} from '../../types/bookApiResponse';
import {API_KEY} from './apiKey';

export const volumeApi = createApi({
    reducerPath: 'volumeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}` }),
    endpoints: (builder) => ({
        getBooksByName: builder.query<Books, string>({
            query: (name) => `&q=${name}`,
        }),
    }),
})
