import {Link} from 'react-router-dom';
import {Book} from '../../types/bookApiResponse';
import cls from './BookCard.module.css'

interface BookCardProps {
    className?: string
    book: Book
}

export const BookCard = (props: BookCardProps) => {
    const {className, book} = props;
    return (
        <Link to={`/single-book/${book.id}`} className={cls.link}>
        <div className={cls.BookCard}>

            <div className={cls.imageContainer}>
                <img className={cls.image} src={book.volumeInfo?.imageLinks?.thumbnail || 'https://avatars.mds.yandex.net/i?id=97ced811068924ee0d9dbecea3026689-5233403-images-thumbs&n=13'} alt={book.volumeInfo.title}/>
            </div>
            <div className={cls.bookData}>
                <p className={cls.categories}>{book.volumeInfo.categories?.join(', ') || ''}</p>
                <h3 className={cls.title}>{book.volumeInfo.title}</h3>
                <div className={cls.authors}>{book.volumeInfo.authors?.join(', ') || ''}</div>
            </div>

        </div>
    </Link>
    );
};


