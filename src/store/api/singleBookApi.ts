import {BaseQueryResult} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {Book} from '../../types/bookApiResponse';
import {API_KEY} from './apiKey';
import {volumeApi} from './volumeApi';

const singleBookApi = volumeApi.injectEndpoints({
    endpoints: build => ({
        getSingleBook: build.query<Book, string>({
            // transformResponse(baseQueryReturnValue: BaseQueryResult<BaseQuery>, meta: BaseQueryMeta<BaseQuery>, arg: QueryArg): Promise<ResultType> | ResultType {
            // }
            query: (id) => {
                return `volumes/${id}?key=${API_KEY}`;
            },
        })
    })
});

export const {useGetSingleBookQuery} = singleBookApi;
