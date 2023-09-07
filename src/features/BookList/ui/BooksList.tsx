import {memo, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BookCard} from '../../../entities/Book/ui/BookCard/BookCard';
import {searchActions} from '../../../entities/search/model/searchReducer';
import {
    searchNameSelector,
    searchOrderSelector,
    searchStartIndexSelector,
    searchSubjectSelector
} from '../../../entities/search/model/searchSelectors';
import Loader from '../../../shared/ui/Loader/Loader';
import {Book} from '../../../types/bookApiResponse';
import {useGetMoreBooksQuery} from '../model/bookListApi';
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
    const [loadMore, setLoadMore] = useState(false);
    const params = {
        name,
        orderBy,
        startIndex,
        subject,
    };
    const {data, isFetching, refetch} = useGetMoreBooksQuery(params, {skip: !Boolean(name)});

    const onloadMore = useCallback(async () => {
        await setLoadMore(true);
        await dispatch(searchActions.setStartIndex(startIndex + 30));
        await refetch();
        await setLoadMore(false);
    }, [dispatch, startIndex, params,]);


    return (
        <div className={cls.BooksList}>
            <p className={cls.count}>Found {data && data.count || 0} results</p>

            {!data && !isFetching && <h2>Введите навзание книги</h2>}
            {data?.books && data.books.map((item) => <BookCard key={item.etag} book={item}/>)}
            {isFetching && <Loader className={cls.loader}/>}
            {data && <div className={cls.buttonWrapper}>
				<button
					onClick={onloadMore}
					disabled={isFetching}
					className={cls.button}
				>
					Load more
				</button>
			</div>}
        </div>
    );
});
