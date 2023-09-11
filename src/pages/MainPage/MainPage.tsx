import {memo} from 'react';
import {BooksList} from '../../features/BookList/ui/BooksList';
import {classNames} from '../../shared/helpers/classNames/classNames';
import ErrorBoundary from '../../widgets/ErrorBoundary/ErrorBoundary';
import cls from './MainPage.module.css';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const {
        className
    } = props;


    return (
        <div className={classNames(cls.MainPage, className)}>
            <ErrorBoundary>
                <BooksList/>
            </ErrorBoundary>
        </div>
    );
});
