import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {volumeApi} from '../api/volumeApi';
import {searchReducer} from '../../entities/search/model/searchReducer';

const rootReducer = combineReducers({
    [volumeApi.reducerPath]: volumeApi.reducer,
    search: searchReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(volumeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
