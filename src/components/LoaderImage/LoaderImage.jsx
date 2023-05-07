import css from './Loader.module.scss';

import { Dna } from 'react-loader-spinner';

export const LoaderImage = () =>{
    return (
        <div className={css.loader__container}>
            <Dna/>
        </div>
    )
}