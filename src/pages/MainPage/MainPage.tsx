import {memo} from 'react';
import {BooksList} from '../../features/BookList/ui/BooksList';
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
        <div className={cls.MainPage}>
            <ErrorBoundary>
                <BooksList/>
            </ErrorBoundary>
        </div>
    );
});
