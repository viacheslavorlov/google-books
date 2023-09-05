import {Book} from '../../types/bookApiResponse';
import {API_KEY} from './apiKey';
import {volumeApi} from './volumeApi';

const singleBookApi = volumeApi.injectEndpoints({
    endpoints: build => ({
        getSingleBook: build.query<Book, string>({
            query: (id) => {
                return `volumes/${id}?key=${API_KEY}`;
            },
        })
    })
});

export const {useGetSingleBookQuery} = singleBookApi;
