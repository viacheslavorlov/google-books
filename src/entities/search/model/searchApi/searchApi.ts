import {API_KEY} from '../../../../store/api/apiKey';
import {ResponseWithCount, volumeApi} from '../../../../store/api/volumeApi';
import {Books} from '../../../../types/bookApiResponse';
import {RequestParams} from '../searchTypes';

const extendedApi = volumeApi.injectEndpoints({
    endpoints: (build) => ({
        getBooksByName: build.query<ResponseWithCount, RequestParams>({
            transformResponse: (response: Books) => ({
                books: response.items,
                count: response.totalItems
            }),
            query: ({orderBy, subject, startIndex, name}) => ({
                url: `volumes?q=${name}${subject !== 'all' ? `+subject:${subject}` : ''}&maxResults=30&orderBy=${orderBy}&startIndex=${startIndex + 30}&key=${API_KEY}`,
                method: 'GET'
            }),
        }),
    }),
    overrideExisting: true,
});

export const {useGetBooksByNameQuery} = extendedApi;
