import {createSlice} from '@reduxjs/toolkit';
import {RequestParams} from './searchTypes';

const initialState: RequestParams = {
    orderBy: 'relevance',
    startIndex: 0,
    name: '',
    subject: 'all'
};

const searchReducerslice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orderBy = action.payload;
        },
        setStartIndex: (state, action) => {
            state.startIndex = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setSubject: (state, action) => {
            state.subject = action.payload;
        }
    }
});

export const {actions: searchActions, reducer: searchReducer} = searchReducerslice
