import cls from './MainPage.module.css';
import {memo} from 'react';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const {
        className
    } = props;

    return (
        <div className={cls.MainPage}>
            <h1>Главная страница</h1>
        </div>
    );
});
