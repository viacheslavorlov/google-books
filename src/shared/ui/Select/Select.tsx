import {classNames} from '../../helpers/classNames/classNames';
import cls from './Select.module.css';
import {ChangeEvent} from 'react';

export interface SelectOption<T extends string> {
	name: string;
	value: T;
}

interface SelectProps<T extends string> {
	className?: string;
	optionsVariants: SelectOption<T>[];
	defaultOption?: string;
	onChange?: (value: T) => void;
    id?: string;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const {
		className = '',
		optionsVariants,
		defaultOption,
		onChange,
        id
	} = props;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(e.target.value as T);
		}
	};

	return (
		<select
			defaultValue={defaultOption}
			className={classNames(cls.Select, className)}
			onChange={onChangeHandler}
            id={id}
		>
			{optionsVariants.map(option => <option key={option.name} value={option.value}>{option.name}</option>)}
		</select>
	);
};
