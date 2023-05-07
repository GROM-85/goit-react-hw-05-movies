import { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import css from './MovieDetails.module.scss';
import { Link, Outlet } from 'react-router-dom';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
// import { LoaderImage } from 'components/LoaderImage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from 'redux/Movies/moviesOperaiton';
import { Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';

const motionImg = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};
const motionText = {
  hidden: {
    opacity: 0,
    transition: {},
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.3,
    },
  },
};

const itemText = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    type: 'spring',
    damping: 12,
    stiffness: 100,
  },
};

export const MovieDetail = () => {
  const movie = useSelector(state => state.movies.movieById);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const isLoading = useSelector(state => state.movies.isLoading);
  const savedNavigate = useRef(location.state?.from);

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [id, dispatch]);

  // console.log('location',location.state?.from);
  return (
    <div>
      {!movie && !isLoading ? (
        <div>
          <p>This movie not found</p>
          <Button
            // variant="outlined"
            to={savedNavigate.current ?? '/'}
            component={Link}
          >
            <ReplyOutlinedIcon />
          </Button>
        </div>
      ) : !isLoading ? (
        <div className={css.movie__detail} key={movie?.id}>
          <Button
            //variant="outlined"
            sx={{ color: '#fff', '&:hover': { color: '#f45814' } }}
            component={Link}
            to={savedNavigate.current ?? '/'}
          >
            <KeyboardBackspaceOutlinedIcon />
          </Button>
          <div className={css.movie__detail__container}>
            <motion.img
              variants={motionImg}
              initial="hidden"
              animate="visible"
              className={css.movie__detail__img}
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt={movie?.title}
              width="360"
            />
            <motion.div
              variants={motionText}
              initial="hidden"
              animate="visible"
            >
              {/* <Stack spacing={3}> */}
              <motion.div variants={itemText}>
                <Typography
                  variant={width <= 768 ? 'h6' : 'h4'}
                  sx={{ fontWeight: 700 }}
                >
                  {movie?.title}({movie?.release_date.slice(0, 4)})
                </Typography>
              </motion.div>
              <motion.div variants={itemText}>
                <Typography
                  variant={width <= 768 ? 'subtitle1' : 'h5'}
                  sx={{ fontWeight: 700 }}
                >
                  Overview
                </Typography>
              </motion.div>
              <motion.div variants={itemText}>
                <Typography variant={width <= 768 ? 'body2' : 'body1'}>
                  {movie?.overview}
                </Typography>
              </motion.div>
              <motion.div variants={itemText}>
                <Typography
                  variant={width <= 768 ? 'subtitle1' : 'h6'}
                  sx={{ fontWeight: 700 }}
                >
                  Genres
                </Typography>
              </motion.div>
              <motion.div variants={itemText}>
                <Stack direction="row" spacing={2}>
                  {movie?.genres.map(({ id, name }) => {
                    return (
                      <Typography
                        variant={width <= 768 ? 'body2' : 'subtitle1'}
                        key={id}
                      >
                        {name}&nbsp;
                      </Typography>
                    );
                  })}
                </Stack>
              </motion.div>
              {/* </Stack> */}
            </motion.div>
          </div>
          <Divider sx={{ bgcolor: '#ffff' }} />
          <div className={css.movie__detail__nav}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" to="cast" component={Link}>
                Cast
              </Button>
              <Button variant="outlined" to="reviews" component={Link}>
                Reviews
              </Button>
            </Stack>
          </div>
          <Outlet />
        </div>
      ) : (
        <Stack spacing={2} direction="row">
          {/* For variant="text", adjust the height via font-size */}
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width={40} height={20} />
            <Skeleton variant="rectangular" width={410} height={580} />
          </Stack>
          <Stack spacing={2} sx={{width:'100%',paddingTop:'30px'}}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          </Stack>
          {/* <Skeleton variant="text" width={400} height={40} />
          <Skeleton variant="rectangular" width={400} height={40} />
          <Skeleton variant="rectangular" width={400} height={40} /> */}
        </Stack>
      )}
    </div>
  );
};
