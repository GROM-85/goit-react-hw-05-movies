import { createSlice } from "@reduxjs/toolkit"
import { fetchByQueryMovies, fetchMovieById, fetchMovieCredit, fetchMovieReviews, fetchTrendingMovies } from "./moviesOperaiton";

const movieSlice = createSlice({
    name:'movies',
    initialState:{
        trendingMovies:[],
        searchMovies:[],
        movieCredits:[],
        movieReviews:[],
        favoriteMovies:[],
        movieById:null,
        isLoading:false,
        totalPages:null,
        error:null,
    },
    reducers:{ 
        setFavorite:(state,{payload}) => {
            state.favoriteMovies = payload;
        }
    },
    extraReducers:builder => {
        builder
        .addCase(fetchTrendingMovies.pending,(state,{payload})=>{
            state.isLoading = true;
        })
        .addCase(fetchTrendingMovies.fulfilled,(state,{payload})=>{
            const {results,total_pages} = payload;
            state.trendingMovies = results;
            state.totalPages = total_pages;
            state.isLoading = false;
        })
        .addCase(fetchTrendingMovies.rejected,(state,{payload})=>{
            state.error = payload
            state.isLoading = false;
        })

        .addCase(fetchByQueryMovies.pending,(state,{payload})=>{
            state.isLoading = true;
        })
        .addCase(fetchByQueryMovies.fulfilled,(state,{payload})=>{
            const {results,total_pages} = payload;
            state.searchMovies = results;
            state.totalPages = total_pages;
            state.isLoading = false;
        })
        .addCase(fetchByQueryMovies.rejected,(state,{payload})=>{
            state.error = payload
            state.isLoading = false;
        })

        .addCase(fetchMovieById.pending,(state,{payload})=>{
            state.movieById = null;
            state.isLoading = true;
        })
        .addCase(fetchMovieById.fulfilled,(state,{payload})=>{
            state.movieById = payload;
            state.isLoading = false;
        })
        .addCase(fetchMovieById.rejected,(state,{payload})=>{
            state.error = payload
            state.isLoading = false;
        })

        .addCase(fetchMovieCredit.pending,(state,{payload})=>{
            state.isLoading = true;
        })
        .addCase(fetchMovieCredit.fulfilled,(state,{payload})=>{
            state.movieCredits = payload;
            state.isLoading = false;
        })
        .addCase(fetchMovieCredit.rejected,(state,{payload})=>{
            state.error = payload
            state.isLoading = false;
        })

        .addCase(fetchMovieReviews.pending,(state,{payload})=>{
            state.isLoading = true;
        })
        .addCase(fetchMovieReviews.fulfilled,(state,{payload})=>{
            state.movieReviews = payload;
            state.isLoading = false;
        })
        .addCase(fetchMovieReviews.rejected,(state,{payload})=>{
            state.error = payload
            state.isLoading = false;
        })
       
    }
})

export const moviesReducer = movieSlice.reducer;
export const {setFavorite} = movieSlice.actions;
export const movieActions = movieSlice.actions;
export default movieSlice;