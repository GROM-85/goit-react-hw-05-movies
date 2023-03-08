import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'af1ce8cf17bdf1608b8338f3be4c63e7';

export const END_POINTS = {
  trend: 'trending/movie/day',
  search: 'search/movie',
  credit: '/credits',
  review: '/reviews',
}

export const getMovies = async ({query='',endpoint=''} = {}) => {
  try {
    const response = await axios.get(`${endpoint}?` + new URLSearchParams({
        query: `${query}`,
        api_key: API_KEY,
    }));
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error?.message);
  }
};

export const getMovieDetail = async ({searchBy='',id=''} = {}) => {
  try {
    const response = await axios.get(`movie/${id}${searchBy}?` + new URLSearchParams({
        api_key: API_KEY,
    }));
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error?.message);
  }
};
