import React,{useState,useEffect} from 'react';
import { MovieGalleryItem } from 'components/MovieGalleryItem';
import css from './MovieGallery.module.scss';
import { getMovies,END_POINTS } from 'utils/ApiService/ApiService';
import Notiflix from 'notiflix';



export const MovieGallery = () => {
  const [movies,setMovies] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);

  const updateMovies = async() =>{
    
    try {
      const {results} = await getMovies({endpoint:END_POINTS.trend});
      // console.log(results)
      if(results.length === 0){
        Notiflix.Notify.info('Nothing has been found!');
        return;
      }
      setMovies([...movies,...results]);

    } catch (error) {
      console.log(error.message)
  }
}

  useEffect(() => {
    updateMovies();
    // eslint-disable-next-line
  },[])

  return (
    <>
      {movies.length !== 0 && (
        <>
          <ul className={css.gallery}>
            {movies.map(({ id, title,poster_path,vote_average}) => (
              <MovieGalleryItem
                key={id}
                id={id}
                img={poster_path}
                title={title}
                rating={vote_average}
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
