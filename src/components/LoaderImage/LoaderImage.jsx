import css from './Loader.module.scss';

export const LoaderImage = () =>{
    return (
        <div className={css.loader__container}>
        <span className={css.loader}></span>
        </div>
    )
}