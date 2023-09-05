import {ChangeEvent, memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import search from '../../../assets/search.svg';
import {classNames} from '../../../shared/helpers/classNames/classNames';
import {useWindowSize} from '../../../shared/hooks/useWindowSize';
import {Input} from '../../../shared/ui/Input/Input';
import {Select, SelectOption} from '../../../shared/ui/Select/Select';
import {useLazyGetBooksByNameQuery} from '../../../store/api/volumeApi';
import {searchActions} from '../model/searchReducer';
import {searchOrderSelector, searchStartIndexSelector, searchSubjectSelector} from '../model/searchSelectors';
import {OrderBy, Subject} from '../model/searchTypes';
import cls from './Search.module.css';

interface SearchProps {
    className?: string;
}

const optionsOrder: SelectOption<OrderBy>[] = [
    {
        name: 'relevance',
        value: 'relevance'
    },
    {
        name: 'newest',
        value: 'newest'
    }
];

const optionsSubject: SelectOption<Subject>[] = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'medical',
        value: 'medical'
    },
    {
        name: 'art',
        value: 'art'
    },
    {
        name: 'history',
        value: 'history'
    },
    {
        name: 'poetry',
        value: 'poetry'
    },
    {
        name: 'biography',
        value: 'biography'
    },
    {
        name: 'computers',
        value: 'computers'
    },
];

export const Search = memo((props: SearchProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();
    const [width, height] = useWindowSize();
    const [name, setName] = useState('');
    const subject = useSelector(searchSubjectSelector);
    const orderBy = useSelector(searchOrderSelector);
    const startIndex = useSelector(searchStartIndexSelector);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [trigger] = useLazyGetBooksByNameQuery();

    const vertical = width > height ? '' : cls.vertical;

    const onChangeOrder = useCallback((value: OrderBy) => {
        dispatch(searchActions.setOrder(value));
    }, [dispatch]);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        dispatch(searchActions.setName(e.target.value));
    };

    const onChangeSubject = useCallback((value: Subject) => {
        dispatch(searchActions.setSubject(value));
    }, [dispatch]);

    const fetchBooksByEnter = (event: KeyboardEvent) => {
        if ((event.code === 'Enter' || event.code === 'NumpadEnter') && name) {
            trigger({
                name,
                subject,
                orderBy,
                startIndex
            });
        }
    };

    const fetchBooksByButton = () => {
        trigger({
            name,
            subject,
            orderBy,
            startIndex
        });
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', fetchBooksByEnter);
            return inputRef.current?.removeEventListener('keydown', fetchBooksByEnter);
        }
    }, []);

    return (
        <div className={classNames(cls.Search, className)}>
            <h1 className={cls.title}>Search for books</h1>
            <div>
                <Input
                    value={name}
                    onChange={onChangeName}
                    placeholder={'Введите название книги'}
                    className={cls.input}
                    ref={inputRef}
                />
                <button onClick={fetchBooksByButton} className={cls.search}>
                    <img src={search} className={cls.img} alt={'search'}/>
                </button>
            </div>


            <div className={classNames(cls.selectWrapper, vertical)}>
                <label htmlFor="subject" className={cls.label}>Categories</label>
                <Select
                    id="subject"
                    onChange={onChangeSubject}
                    optionsVariants={optionsSubject} className={cls.select}/>
                <label htmlFor="order" className={cls.label}>Sorting by</label>
                <Select id="order" optionsVariants={optionsOrder} onChange={onChangeOrder} className={cls.select}/>
            </div>
        </div>
    );
});
