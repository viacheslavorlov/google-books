export type Subject = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';

export type OrderBy = 'newest' | 'relevance'

export interface RequestParams {
    name: string
    startIndex: number;
    subject: Subject;
    orderBy: OrderBy;
    merge?: boolean;
}
