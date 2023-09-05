import {memo} from 'react';
import {useParams} from 'react-router-dom';
import {useGetSingleBookQuery} from '../../store/api/singleBookApi';
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
    const {data} = useGetSingleBookQuery(id);


    return (
        <div className={cls.SingleBookPage}>
            <h1>Single Book page</h1>
        </div>
    );


});
