import {classNames} from '../../../../shared/helpers/classNames/classNames';
import {useWindowSize} from '../../../../shared/hooks/useWindowSize';
import cls from './DetaildBookCard.module.css';
import {Book} from '../../../../types/bookApiResponse';

interface DetaildBookCardProps {
    className?: string;
    book: Book;
}

export const DetaildBookCard = (props: DetaildBookCardProps) => {
    const {book} = props;
    const [width, height] = useWindowSize();

    const vertical = width <= height ? cls.vertical : ''
    return (
        <div className={classNames(cls.wrapper, vertical)}>
            <div className={cls.imageWrapper}>
                <img
                    className={cls.img}
                    src={book?.volumeInfo.imageLinks?.thumbnail
                        || 'https://avatars.mds.yandex.net/i?id=97ced811068924ee0d9dbecea3026689-5233403-images-thumbs&n=13'}
                    alt={book?.volumeInfo.title}/>
            </div>
            <div className={cls.contentWrapper}>
                <div className={cls.categories}>{book?.volumeInfo.categories?.join(' / ')}</div>
                <h1 className={cls.title}>{book?.volumeInfo.title}</h1>
                <div className={cls.authors}>{book?.volumeInfo?.authors?.join(', ')}</div>
                <div className={cls.description}>{book?.volumeInfo.description}</div>
            </div>
        </div>
    );
};


