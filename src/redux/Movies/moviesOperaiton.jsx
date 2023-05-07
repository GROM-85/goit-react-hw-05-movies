import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovieDetail,getMovies,END_POINTS } from 'utils/ApiService/ApiService';

export const fetchTrendingMovies = createAsyncThunk(
    'movies/trendingMovies',
    async(page,{rejectWithValue})=>{
        try {
            const {results,total_pages} = await getMovies({page,endpoint:END_POINTS.trend});
            return {results,total_pages};
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchByQueryMovies = createAsyncThunk(
    'movies/byQueryMovies',
    async({query,page},{rejectWithValue})=>{
        try {
            const data = await getMovies({query,page,endpoint:END_POINTS.search});
            
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMovieById = createAsyncThunk(
    'movies/byMovieId',
    async(id,{rejectWithValue})=>{
        try {
            const data = await getMovieDetail({id});
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMovieCredit = createAsyncThunk(
    'movies/byCredit',
    async(id,searchBy,{rejectWithValue})=>{
        try {
            const data = await getMovieDetail({searchBy,id});
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMovieReviews = createAsyncThunk(
    'movies/byReviews',
    async(id,searchBy,{rejectWithValue})=>{
        try {
            const data = await getMovieDetail({searchBy,id});
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


