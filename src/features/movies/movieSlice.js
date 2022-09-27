// import createSlice
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    movies: {},
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
});

export const { addMovies } = movieSlice.actions;

// func to get all the movies in the state
export const getAllMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
