import css from './MovieGalleryItem.module.scss';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const MovieGalleryItem = ({ id, img, title, rating }) => {
  const location = useLocation();
  return (
    
      <li id={id} className={css.gallery__item}>
        <Link to={`/movies/${id}`} state={{ from: location}}>
          <img className={css.gallery__item__img}src={`https://image.tmdb.org/t/p/original/${img}`} alt={title} />
        </Link>
        <div className={css.gallery__item__info}>
          <p className={css.gallery__item__title}>{title}</p>
          <span className={css.gallery__item__rating}>{rating.toFixed(1)}</span>
        </div>
      </li>
   
  );
};

MovieGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
