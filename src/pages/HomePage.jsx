import { MovieGallery } from 'components/MovieGallery';
import { Typography,} from '@mui/material';
import { MoviePagination } from 'components/Pagination/Pagination';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchTrendingMovies } from 'redux/Movies/moviesOperaiton';
import { Container } from 'components/App/App.styled';

const Home = () => {
  const totalPages = useSelector(state=>state.movies.totalPages);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const [queryStr,setQueryStr] = useSearchParams();
  const dispatch = useDispatch();
  const page = queryStr.get('page') ?? "1";

  const handlePagination = (_,page) =>{
    setQueryStr({page})
  }

  useEffect(()=>{
   
    dispatch(fetchTrendingMovies(page))
  },[page,dispatch])
  
  return (
    
    <main style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Typography component={'h2'} variant={'h5'}>Movies in trend today</Typography>
      <MovieGallery />
      {isLoggedIn && <MoviePagination
        count={totalPages}
        onChange={handlePagination}
        page={Number(page)}
      />}
    </main>
    
  );
};

export default Home;