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

    async () => {
        const movieText = "Harry";
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${movieText}&type=movie`
        );
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",

    async () => {
        const seriesText = "Friends";
        const response = await MovieApi.get(
            `?apiKey=${APIKey}&s=${seriesText}&type=series`
        );
        return response.data;
    }
);

// initial state
const initialState = {
    movies: {},
    shows: {},
};

// create the movies slice
const movieSlice = createSlice({
    // name of the slice
    name: "movies",
    // initial state
    initialState,
    // reducers/actions object
    reducers: {
        addMovies: (state, { payload }) => {
            // immer takes care of state immutability
            state.movies = payload;
        },
    },
    // extra reducers handle work outside the component
    extraReducers: {
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
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("shows fetched successflly");
            return { ...state, shows: payload };
        },
    },
});

export const { addMovies } = movieSlice.actions;

// funcs to get all the movies and shows in the state
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;
