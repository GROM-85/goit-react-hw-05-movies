import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const SharedLayout = lazy(() => import('../SharedLayout/SharedLayout'));
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));
const Home = lazy(() => import('../../pages/Home'));
const MovieDetailPage= lazy(() => import('../../pages/MovieDetails'));
const Movies= lazy(() => import('../../pages/Movies'));

export const App = () => {

  return (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />}/>
          <Route path="movies/:id" element={<MovieDetailPage/>}>
            <Route path="cast" element={<Cast />}/>
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
  );
};
