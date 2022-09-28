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

    useEffect(() => {
        if (fetchRef.current) {
            fetchRef.current = false;
            dispatch(fetchAsyncMovies());
            dispatch(fetchAsyncShows());
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
