import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32950836-9c0ce5402bfaddd9a8ff9a3e7';

export const getData = async ({query, page} = {}) => {
    console.log(page)
  try {
    const response = await axios.get('',{
      params: {
        q: `${query}`,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error?.message);
  }
};
