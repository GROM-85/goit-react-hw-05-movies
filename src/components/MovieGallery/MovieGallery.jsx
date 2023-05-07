import React,{useEffect} from 'react';
import { MovieGalleryItem } from 'components/MovieGalleryItem';
import css from './MovieGallery.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import * as movieOperations from 'redux/Movies/moviesOperaiton';

export const MovieGallery = () => {
  // const dispatch = useDispatch();
  const movies = useSelector(state=>state.movies.trendingMovies);
  const favoriteMovies = useSelector(state=>state.movies.favoriteMovies);

  // useEffect(() => {
  //   // dispatch(movieOperations.fetchTrendingMovies())
  // },[dispatch]);

  return (
    <>
      {movies.length > 0  && (
        <>
          <ul className={css.gallery}>
            {movies.map(({ id, title,poster_path,vote_average}) => (
              <MovieGalleryItem
                key={id}
                id={id}
                img={poster_path}
                title={title}
                rating={vote_average.toFixed(1)}
                isFavorite={favoriteMovies.some(movie => movie.id === id)}
              />
            )) }
          </ul>
        </>
      )}
    </>
  );
};

// MovieGallery.propTypes = {
  
// };
