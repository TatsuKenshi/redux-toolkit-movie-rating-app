import React, { useEffect, useRef } from "react";
import MovieListing from "../MovieListing/MovieListing";
import MovieApi from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";
import "./Home.scss";

const Home = () => {
    let fetchRef = useRef(true);
    const movieText = "Harry";

    // dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        if (fetchRef.current) {
            fetchRef.current = false;

            const fetchMovies = async () => {
                const response = await MovieApi.get(
                    `?apiKey=${APIKey}&s=${movieText}&type=movie`
                ).catch((error) => {
                    console.log("Error : ", error);
                });
                // dispatch the addMovies action to the Redux store to update the movies state
                // send the response.data object, as it contains the movies
                dispatch(addMovies(response.data));
            };

            fetchMovies();
        }
    }, []);

    return (
        <div>
            <div className="banner-img"></div>;
            <MovieListing />;
        </div>
    );
};

export default Home;
