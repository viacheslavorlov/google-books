import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BookCard} from '../../entities/Book/BookCard';
import {searchActions} from '../../entities/search/model/searchReducer';
import {
    searchNameSelector,
    searchOrderSelector,
    searchStartIndexSelector,
    searchSubjectSelector
} from '../../entities/search/model/searchSelectors';
import {useGetBooksByNameQuery} from '../../store/api/volumeApi';
import {Book} from '../../types/bookApiResponse';
import cls from './BooksList.module.css';

interface BooksLIstProps {
    className?: string;
}

export const BooksList = memo((props: BooksLIstProps) => {
    const {
        className
    } = props;
    const [books, setBooks] = useState<Book[]>([]);
    const dispatch = useDispatch();
    const startIndex = useSelector(searchStartIndexSelector);
    const name = useSelector(searchNameSelector);
    const subject = useSelector(searchSubjectSelector);
    const orderBy = useSelector(searchOrderSelector);

    const {data, isFetching, isLoading} = useGetBooksByNameQuery({
        name,
        orderBy,
        startIndex,
        subject
    });

    const onloadMore = useCallback(() => {
        dispatch(searchActions.setStartIndex(startIndex + 30));
    }, [dispatch, name, orderBy, startIndex, subject]);

    useEffect(() => {
        if (!isFetching && !isLoading && data) {
            setBooks(data);
        }
    }, [data]);


    return (
        <div className={cls.BooksList}>
            {(isFetching || isLoading) && <h2>Загрузка...</h2>}
            {books.length ? books.map((item) => <BookCard key={item.etag} book={item}/>) : (
                <h2>Наберите навзание книги</h2>
            )}
            {books.length > 0 && <button onClick={onloadMore}>загрузить ещё</button>}
        </div>
    );
});
