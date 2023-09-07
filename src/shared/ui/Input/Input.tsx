import {forwardRef, InputHTMLAttributes, memo} from 'react';
import {classNames} from '../../helpers/classNames/classNames';
import cls from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
    className?: string;
    type?: string;
    placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement>((props: InputProps, ref) => {
    const {
        className,
        type = 'text',
        ...additionalArgs
    } = props;

    return (
        <input
            ref={ref}
            type={type}
            className={classNames(cls.Input, className)}
            {...additionalArgs}
        />
    );
});

