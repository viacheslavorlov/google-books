import {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VirtuosoGrid} from 'react-virtuoso';
import {BookCard} from '../../../entities/Book/ui/BookCard/BookCard';
import {searchActions} from '../../../entities/search/model/searchReducer';
import {
    searchNameSelector,
    searchOrderSelector,
    searchStartIndexSelector,
    searchSubjectSelector
} from '../../../entities/search/model/searchSelectors';
import {classNames} from '../../../shared/helpers/classNames/classNames';
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
    const dispatch = useDispatch();
    const startIndex = useSelector(searchStartIndexSelector);
    const name = useSelector(searchNameSelector);
    const subject = useSelector(searchSubjectSelector);
    const orderBy = useSelector(searchOrderSelector);
    const params = {
        name,
        orderBy,
        startIndex,
        subject,
    };
    const {data, isFetching, refetch} = useGetMoreBooksQuery(params, {skip: !Boolean(name)});

    const onloadMore = useCallback(async () => {
        await dispatch(searchActions.setStartIndex(startIndex + 30));
        await refetch();
    }, [dispatch, startIndex, params]);

    const Footer = () => (
        <>
            {isFetching && <Loader className={cls.loader}/>}
            <div className={cls.buttonWrapper}>
                <button
                    onClick={onloadMore}
                    disabled={isFetching}
                    className={cls.button}
                >
                    Load more
                </button>
            </div>
        </>
    );


    if (!data && !isFetching) {
        return (
            <div className={cls.ListWrapper}>
                <h2 className={cls.placeholder}>Введите навзание книги</h2>
            </div>
        );
    }

    if (!data && isFetching) {
        return <Loader className={cls.loader}/>;
    }

    return (
        <div className={classNames(cls.ListWrapper, className)}>
            {data?.books && (
                <VirtuosoGrid
                    data={data?.books}
                    style={{height: '100%', width: '100%',}}
                    totalCount={data?.books.length}
                    listClassName={cls.BooksList}
                    components={{
                        Footer
                    }}
                    itemContent={(index: number, item: Book) => <BookCard key={item.id} book={item}/>}
                />
            )}

        </div>
    );
});
