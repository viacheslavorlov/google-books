import {RootState} from '../../../store/main';

export const searchNameSelector = (state: RootState) => state.search.name;
export const searchOrderSelector = (state: RootState) => state.search.orderBy || 'relevance';
export const searchSubjectSelector = (state: RootState) => state.search.subject || 'all';
export const searchStartIndexSelector = (state: RootState) => state.search.startIndex || 0;
