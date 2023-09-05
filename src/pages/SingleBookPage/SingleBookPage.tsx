import cls from './SingleBookPage.module.css';
import {memo} from 'react';

interface SingleBookPageProps {
    className?: string;
}

export const SingleBookPage = memo((props: SingleBookPageProps) => {
    const {
        className
    } = props;

    return (
        <div className={cls.SingleBookPage}>
            <h1>Single Book page</h1>
        </div>
    );
});
