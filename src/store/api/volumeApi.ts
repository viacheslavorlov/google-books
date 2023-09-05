import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RequestParams} from '../../entities/search/model/searchTypes';
import {Book, Books} from '../../types/bookApiResponse';
import {API_KEY} from './apiKey';

export const volumeApi = createApi({
    reducerPath: 'volumeApi',
    baseQuery: fetchBaseQuery({baseUrl: `https://www.googleapis.com/books/v1`}),
    endpoints: (builder) => ({
        getBooksByName: builder.query<Book[], RequestParams>({
            transformResponse: (response: Books) => response.items,
            query: ({orderBy, subject, startIndex, name}) => {
                return `volumes?q=${name}${subject !== 'all' ? `+subject:${subject}` : ''}&maxResults=30&orderBy=${orderBy}&startIndex=${startIndex + 30}&key=${API_KEY}`;
            },
        }),
    }),
});

export const {useGetBooksByNameQuery, useLazyGetBooksByNameQuery} = volumeApi;

