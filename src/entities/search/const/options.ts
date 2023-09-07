import {SelectOption} from '../../../shared/ui/Select/Select';
import {OrderBy, Subject} from '../model/searchTypes';

export const optionsOrder: SelectOption<OrderBy>[] = [
    {
        name: 'relevance',
        value: 'relevance'
    },
    {
        name: 'newest',
        value: 'newest'
    }
];
export const optionsSubject: SelectOption<Subject>[] = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'medical',
        value: 'medical'
    },
    {
        name: 'art',
        value: 'art'
    },
    {
        name: 'history',
        value: 'history'
    },
    {
        name: 'poetry',
        value: 'poetry'
    },
    {
        name: 'biography',
        value: 'biography'
    },
    {
        name: 'computers',
        value: 'computers'
    },
];
