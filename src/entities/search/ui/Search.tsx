import {memo, useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import search from '../../../assets/search.svg';
import {classNames} from '../../../shared/helpers/classNames/classNames';
import {useWindowSize} from '../../../shared/hooks/useWindowSize';
import {Input} from '../../../shared/ui/Input/Input';
import {Select} from '../../../shared/ui/Select/Select';
import {volumeApi} from '../../../store/api/volumeApi';
import {optionsOrder, optionsSubject} from '../const/options';
import {useGetBooksByNameQuery} from '../model/searchApi/searchApi';
import {searchActions} from '../model/searchReducer';
import {
    searchNameSelector,
    searchOrderSelector,
    searchStartIndexSelector,
    searchSubjectSelector
} from '../model/searchSelectors';
import {OrderBy, Subject} from '../model/searchTypes';
import cls from './Search.module.css';

interface SearchProps {
    className?: string;
}

export const Search = memo((props: SearchProps) => {
    const {
        className
    } = props;
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const [width, height] = useWindowSize();
    const name = useSelector(searchNameSelector)
    const subject = useSelector(searchSubjectSelector);
    const orderBy = useSelector(searchOrderSelector);
    const startIndex = useSelector(searchStartIndexSelector);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {refetch, isFetching} = useGetBooksByNameQuery({
        name,
        subject,
        orderBy,
        startIndex,
        merge: false
    }, {
        skip: !Boolean(name)
    });

    const vertical = width > height ? '' : cls.vertical;

    const onChangeOrder = useCallback(async (value: OrderBy) => {
        await dispatch(searchActions.setOrder(value));
    }, [dispatch]);

    const onChangeName = async () => {
        if (!isFetching) {
            pathname !== '/' ? navigate('/') : null
            dispatch(volumeApi.util.resetApiState())
            await dispatch(searchActions.setName(inputRef.current?.value));
            await refetch();
        }
    };

    const onChangeSubject = useCallback(async (value: Subject) => {
        await dispatch(searchActions.setSubject(value));
    }, [dispatch]);

    const fetchBooksByEnter = async (event: KeyboardEvent) => {
        if ((event.code === 'Enter' || event.code === 'NumpadEnter') && inputRef.current?.value) {
            dispatch(volumeApi.util.resetApiState())
            await onChangeName();
        }
    };


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', fetchBooksByEnter);
            return () => {
                inputRef.current?.removeEventListener('keydown', fetchBooksByEnter);
            };
        }
    }, [fetchBooksByEnter]);

    return (
        <div className={classNames(cls.Search, className)}>
            <h1 className={cls.title}>Search for books</h1>
            <div className={cls.inputWrapper}>
                <Input // @ts-ignore
                    placeholder={'Введите название книги'}
                    className={cls.input}
                    ref={inputRef}
                />
                <button onClick={onChangeName} className={cls.search}>
                    <img src={search} className={cls.img} alt={'search'}/>
                </button>
            </div>


            <div className={classNames(cls.selectWrapper, vertical)}>
                <label htmlFor="subject" className={cls.label}>Categories</label>
                <Select
                    id="subject"
                    onChange={onChangeSubject}
                    optionsVariants={optionsSubject}
                    className={cls.select}
                />
                <label htmlFor="order" className={cls.label}>Sorting by</label>
                <Select
                    id="order"
                    optionsVariants={optionsOrder}
                    onChange={onChangeOrder}
                    className={cls.select}
                />
            </div>
        </div>
    );
});
