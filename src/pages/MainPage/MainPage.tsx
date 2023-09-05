import {memo} from 'react';
import {BooksList} from '../../features/BookList/BooksList';
import cls from './MainPage.module.css';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const {
        className
    } = props;


    return (
        <div className={cls.MainPage}>
            <BooksList/>
        </div>
    );
});
