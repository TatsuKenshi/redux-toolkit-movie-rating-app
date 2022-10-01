// import createSlice, createAsyncThunk
// thunk is there for asynchronous tasks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";

// the thunk takes two arguments - name (string) and a payload-creator callback function
// the name is usually a combo of the reducer's name and the name of the variable the thunk is assigned to
// the callback function, in this case, is the movie fetch function
// optionally, the thunk can take a third argument - an object

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",

    async (term) => {
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=movie`
        );
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",

    async (term) => {
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${term}&type=series`
        );
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&i=${id}&Plot=full`
        );
        return response.data;
    }
);

// initial state
const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
};

// create the movies slice
const movieSlice = createSlice({
    // name of the slice
    name: "movies",
    // initial state
    initialState,
    // reducers/actions object
    reducers: {
        removeSelectMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        },
    },
    // extra reducers handle work outside the component
    extraReducers: {
        // extra reducers for all movies
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("fetched successflly");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected");
        },
        // extra reducers for all shows
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("shows fetched successflly");
            return { ...state, shows: payload };
        },
        // extra reducers for single movie or show
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },
    },
});

export const { removeSelectMovieOrShow } = movieSlice.actions;

// funcs to get all the movies and shows in the state
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
// func to get the selected movie or show details
export const getSelectMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;
