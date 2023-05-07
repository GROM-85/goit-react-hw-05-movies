import { Search } from "components/Search";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieGalleryItem } from "components/MovieGalleryItem";
import css from '../components/MovieGallery/MovieGallery.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { MoviePagination } from "components/Pagination/Pagination";
import { fetchByQueryMovies } from "redux/Movies/moviesOperaiton";


const Movies = () =>{
    const totalPages = useSelector(state=>state.movies.totalPages);
    const isLoading = useSelector(state=>state.movies.isLoading);
    const [searchParams,setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    let movies = useSelector(state => state.movies.searchMovies)
    const page = searchParams.get('page')?? 1;
    const query = searchParams.get("query")?? '';
    const [prevQuery,setPrevQuery] = useState('');

    const handlePagination = (_,page) =>{
      setSearchParams({query,page})
    }

    useEffect(() =>{
        if(!query) return;
        console.log(query)
        console.log(page)
        dispatch(fetchByQueryMovies({query,page}));

    },[query,page,dispatch]);
    
    if(!query){
      movies = [];
    };

    if(prevQuery!== query){
      setPrevQuery(query);
      return;
    }
    return (
      <main>
        <Search setSearchParams={setSearchParams} />
        {movies.length > 0 && !isLoading ? (
          <><ul className={css.gallery}>
            {movies.map(({ id, title, poster_path, vote_average,isFavorite }) => (
              <MovieGalleryItem
                key={id}
                id={id}
                img={poster_path}
                title={title}
                rating={vote_average} />
            ))}
          </ul><MoviePagination
              count={totalPages}
              onChange={handlePagination}
              page={Number(page)} /></>
        ):( query && !isLoading && <div>There are no results according you search!</div>)}
     
      </main>
    );
}

export default Movies;