import { Search } from "components/Search";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, END_POINTS } from 'utils/ApiService/ApiService';
import { MovieGalleryItem } from "components/MovieGalleryItem";
import css from '../components/MovieGallery/MovieGallery.module.scss';

const Movies = () =>{
    const [movies,setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams,setSerachParams] = useSearchParams();
    const movieName = searchParams.get("query" ?? '');

    async function fetchMovie(){
        setIsLoading(true);
        try {
            const {results} = await getMovies({query:movieName,endpoint:END_POINTS.search});
            // console.log('Movie search', results);
            setMovies(results);
            setIsLoading(false);
        } catch (error) {
            console.log(error?.message);
        }
    }

    useEffect(() =>{
        if(!movieName) return;

        fetchMovie();
         // eslint-disable-next-line
    },[movieName]);
    
    // console.log('movie',movieName)
    return (
      <main>
        <Search setQuery={setSerachParams} />
        {movies.length !== 0 && !isLoading ? (
          <ul className={css.gallery}>
            {movies.map(({ id, title, poster_path, vote_average }) => (
              <MovieGalleryItem
                key={id}
                id={id}
                img={poster_path}
                title={title}
                rating={vote_average}
              />
            ))}
          </ul>
        ):((movieName && !isLoading) && <div>There are no results according you search!</div>)}
      </main>
    );
}

export default Movies;