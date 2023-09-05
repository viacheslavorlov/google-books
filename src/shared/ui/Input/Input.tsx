import {classNames} from '../../helpers/classNames/classNames';
import cls from './Input.module.css';
import {InputHTMLAttributes, memo, MutableRefObject} from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
    className?: string;
	type?: string;
	placeholder?: string
    ref?: MutableRefObject<HTMLInputElement | null>
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		type = 'text',
		...additionalArgs
	} = props;

	return (
		<input
            type={type}
            className={classNames(cls.Input, className)}
            {...additionalArgs}
        />
	);
});

