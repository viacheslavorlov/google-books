import {RequestParams} from '../../../entities/search/model/searchTypes';
import {API_KEY} from '../../../store/api/apiKey';
import {ResponseWithCount, volumeApi} from '../../../store/api/volumeApi';
import {Books} from '../../../types/bookApiResponse';

const bookListApi = volumeApi.injectEndpoints({
    endpoints: (build) => ({
        getMoreBooks: build.query<ResponseWithCount, RequestParams>({
            transformResponse: (response: Books) => ({
                books: response.items,
                count: response.totalItems
            }),
            query: ({orderBy, subject, startIndex, name}) =>
                `volumes?q=${name}${subject !== 'all' ? `+subject:${subject}` : ''}&maxResults=30&orderBy=${orderBy}&startIndex=${startIndex + 30}&key=${API_KEY}`,
            merge(currentCacheData, responseData, ) {
                currentCacheData.books.push(...responseData.books);
            },

            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            providesTags: ['Books'],
            forceRefetch({currentArg, previousArg}): boolean {
                return currentArg !== previousArg && Boolean(currentArg?.name);
            },
        }),
    }),
    overrideExisting: true,
})

export const { useGetMoreBooksQuery } = bookListApi;
