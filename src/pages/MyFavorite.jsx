import { Typography } from "@mui/material"
import css from '../components/MovieGallery/MovieGallery.module.scss';
import { retreiveUserFirebaseDB } from "AppFirebase/firebase";
import { MovieGalleryItem } from 'components/MovieGalleryItem';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "redux/Movies/slice";

const MyFavorite = () => {
   
    const dispatch = useDispatch()
    const {uid} = useSelector(state => state.auth.user);
    const isLoading = useSelector(state=>state.movies.isLoading);
    const favoriteMovies = useSelector(state=>state.movies.favoriteMovies);

    useEffect(() => {
        const getMovies = async()=>{
            // console.log(uid)
            const movies = await retreiveUserFirebaseDB(uid);
            dispatch(setFavorite(movies));
        }
        getMovies();
    },[uid,dispatch]);
    
    return(
        <main style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography variant="h5" component='h2'>Your favorite movies</Typography>
        {favoriteMovies.length > 0 || !isLoading? (
          <ul className={css.gallery}>
            {favoriteMovies.map(({ id, title, img, rating }) => (
              <MovieGalleryItem
                key={id}
                id={id}
                img={img}
                title={title}
                rating={rating}
                isFavPage = {true}
                 />
            ))}
          </ul>
        ):(<div>There are no results according you search!</div>)}
        </main>
    )
};

export default MyFavorite;