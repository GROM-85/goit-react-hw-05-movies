import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams,useLocation} from 'react-router-dom';
import { getMovieDetail} from 'utils/ApiService/ApiService';
import css from './MovieDetails.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { LoaderImage } from 'components/LoaderImage';


export const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const savedNavigate = useRef(location.state?.from);

  useEffect(() => {
    setIsLoading(true)
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetail({ id: id });
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
      }
    };

    fetchMovie();
    // eslint-disable-next-line
  }, [id]);

  
  // console.log('location',location.state?.from)
  return (
    <main>
      {!movie && !isLoading ? (
        <div>
          <p>This movie not found</p>
        </div>
      ) : (
        <div className={css.movie__detail} key={movie?.id}>
          <Link className={css.movie__detail__btn} to={savedNavigate.current ?? '/'}>Back</Link>
          <div className={css.movie__detail__img}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt={movie?.title}
              width="360"
            />
          </div>
          <h2>
            {movie?.title}({movie?.release_date.slice(0,4)})
          </h2>

          <h3>Overview</h3>
          <p>{movie?.overview}</p>
          <h4>Genres</h4>
          {movie?.genres.map(({ id, name }) => {
            return <span key={id}>{name}</span>;
          })}
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<LoaderImage/>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </main>
  );
};
