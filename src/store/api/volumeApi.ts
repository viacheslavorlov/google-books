import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Book, Books} from '../../types/bookApiResponse';

export interface ResponseWithCount {
    books: Book[];
    count: number;
}


export const volumeApi = createApi({
    reducerPath: 'volumeApi',
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({baseUrl: `https://www.googleapis.com/books/v1`}),
    tagTypes: ['Books'],
    endpoints: (builder) => ({}),
});


