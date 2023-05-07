import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoaderImage } from 'components/LoaderImage';

const SharedLayout = lazy(() => import('../SharedLayout/SharedLayout'));
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));
const Home = lazy(() => import('../../pages/HomePage'));
const MovieDetailPage = lazy(() => import('../../pages/MovieDetailsPage'));
const Movies = lazy(() => import('../../pages/MoviesPage'));
const Favorite = lazy(() => import('../../pages/MyFavorite'));
const SignInPage = lazy(() => import('../../pages/SignInPage'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage'));

export const App = () => {
  return (
    <Suspense fallback={<LoaderImage />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="movies" element={<Movies />} />
          <Route
            path="movies/:id"
            element={
              // <Suspense fallback={<LoaderImage />}>
                <MovieDetailPage />
                // </Suspense> 
            }
          >
            <Route
              path="cast"
              element={
              <Suspense fallback={<LoaderImage />}>
                  <Cast />
                </Suspense>
              }
            />

            <Route
              path="reviews"
              element={
                <Suspense fallback={<LoaderImage />}>
                  <Reviews />
                </Suspense>
              }
            />
          </Route>
          <Route path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
