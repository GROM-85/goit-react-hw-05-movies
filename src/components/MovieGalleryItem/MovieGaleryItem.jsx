import css from './MovieGalleryItem.module.scss';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { handleDeleteFromFirebase, handleUpdateFirebase, retreiveUserFirebaseDB } from 'AppFirebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Skeleton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { toast } from 'react-hot-toast';
import { setFavorite } from 'redux/Movies/slice';

const buttonStyles = {
  bgcolor: 'rgba(205,88,45,0.7)',
  color: 'white',
  outline: 'none',
  width: '50%',
  fontSize: '12px',
  marginBottom:'10px',
  marginTop:'auto',
  transition:'scale 0.5s easy',

  '&:hover':{
    bgcolor:'rgba(205,88,45,1)',
    scale:'1.05'
  }
};

export const MovieGalleryItem = ({ id, img, title, rating,isFavPage,isFavorite}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.movies.isLoading);
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const uid = useSelector(state => state.auth.user.uid);
  const favoriteMovies = useSelector(state => state.movies.favoriteMovies);

  const handleDelete = async(movie,uid) => {
    try {
      await handleDeleteFromFirebase(movie,uid);
      const filteredMovies =  favoriteMovies.filter(item => item.id !== movie.id);
      dispatch(setFavorite(filteredMovies));
      // const movies = await retreiveUserFirebaseDB(uid);
      // dispatch(setFavorite(movies));
    } catch (error) {
      toast.error('Something went wrong during deleting of movie')
    }
  }
  // console.log('location from',location)
  return (
    <li id={id} className={css.gallery__item}>
      <Link to={`/movies/${id}`} state={{ from: location }} >
        {!isLoading ? (
          <img
            className={css.gallery__item__img}
            src={`https://image.tmdb.org/t/p/original/${img}`}
            alt={title}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={280}
            height={360}
            style={{ marginTop: '20px' }}
          />
        )}
      </Link>
      
      <div className={css.gallery__item__info}>
        <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
        <Typography variant='subtitle1' className={css.gallery__item__title}>{title}</Typography> {isFavorite ? <StarIcon sx={{fill:'#4b4c4d'}}/> : ''}
        </div>
        <span className={css.gallery__item__rating}>{rating}</span>
      </div>
      {isLoggedIn && (
          <>{!isFavPage ? <Button
          variant="contained"
          sx={buttonStyles}
          type="button"
          onClick={() => handleUpdateFirebase({ id, img, title, rating }, uid)}
        >
          Add to favorite
        </Button> : <Button
          variant="contained"
          sx={buttonStyles}
          type="button"
          onClick={() => handleDelete({ id, img, title, rating },uid)}
        >
            remove
          </Button>}</>
        )}
    </li>
  );
};

MovieGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
