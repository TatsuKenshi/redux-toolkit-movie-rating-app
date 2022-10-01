import React, { useEffect, useRef } from "react";
import MovieListing from "../MovieListing/MovieListing";

// import dispatch
import { useDispatch } from "react-redux";
// import fetch functions from the slice
import {
    fetchAsyncMovies,
    fetchAsyncShows,
} from "../../features/movies/movieSlice";
import "./Home.scss";

const Home = () => {
    // useRef to deal with rerendering in React 18
    let fetchRef = useRef(true);

    // dispatch
    const dispatch = useDispatch();

    // default search term
    const movieText = "Harry";
    const showText = "Friends";

    useEffect(() => {
        if (fetchRef.current) {
            fetchRef.current = false;
            dispatch(fetchAsyncMovies(movieText));
            dispatch(fetchAsyncShows(showText));
        }
    }, [dispatch]);

    return (
        <div>
            <div className="banner-img"></div>;
            <MovieListing />;
        </div>
    );
};

export default Home;
