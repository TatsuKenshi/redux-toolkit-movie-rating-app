import React, { useEffect, useRef } from "react";
import MovieListing from "../MovieListing/MovieListing";
import MovieApi from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";
import "./Home.scss";

const Home = () => {
    let fetchRef = useRef(true);
    const movieText = "Harry";

    useEffect(() => {
        if (fetchRef) {
            fetchRef = false;

            const fetchMovies = async () => {
                const response = await MovieApi.get(
                    `?apiKey=${APIKey}&s=${movieText}&type=movie`
                ).catch((error) => {
                    console.log("Error : ", error);
                });
                console.log("Api response :", response);
            };

            // fetchMovies();
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
