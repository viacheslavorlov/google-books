import {classNames} from '../../helpers/classNames/classNames';
import cls from './Loader.module.css'; // Import the CSS file for styling

interface LoaderProps {
    className?: string;
}

const Loader = (props: LoaderProps) => {
    return (
        <div className={classNames(cls.loaderContainer, props.className)}>
            <div className={cls.loader}></div>
        </div>
    );
};
export default Loader;
