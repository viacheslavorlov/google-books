import {memo} from 'react';
import {useParams} from 'react-router-dom';
import {DetaildBookCard} from '../../entities/Book/ui/DetaildBookCard/DetaildBookCard';
import {classNames} from '../../shared/helpers/classNames/classNames';
import Loader from '../../shared/ui/Loader/Loader';
import {useGetSingleBookQuery} from '../../store/api/singleBookApi';
import ErrorBoundary from '../../widgets/ErrorBoundary/ErrorBoundary';
import cls from './SingleBookPage.module.css';

interface SingleBookPageProps {
    className?: string;
}

export const SingleBookPage = memo((props: SingleBookPageProps) => {
    const {
        className
    } = props;
    const {id} = useParams();
    // @ts-ignore
    const {data, isFetching} = useGetSingleBookQuery(id);

    if (data && !isFetching) {
        return (
            <div className={classNames(cls.SingleBookPage)}>
                <ErrorBoundary>
                    <DetaildBookCard book={data}/>
                </ErrorBoundary>
            </div>
        );
    }
    if (isFetching) {
        return <Loader/>;
    }
    return null;
});
