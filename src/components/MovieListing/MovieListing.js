import React from "react";
import Slider from "react-slick";
import { settings } from "../../common/settings";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
    // select all movies and shows from the state
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);

    // create variables to store movie and show lists
    let renderMovies = "";
    let renderShows = "";

    // if movies.Response is true, we'll map
    // if it's false, we'll display error message
    renderMovies =
        movies.Response === "True" ? (
            movies.Search.map((movie, index) => {
                return <MovieCard key={index} data={movie} />;
            })
        ) : (
            <div className="movies-error">
                {" "}
                <h3>{movies.Error}</h3>
            </div>
        );

    // if shows.Response is true, we'll map
    // if it's false, we'll display error message
    renderShows =
        shows.Response === "True" ? (
            shows.Search.map((show, index) => {
                return <MovieCard key={index} data={show} />;
            })
        ) : (
            <div className="movies-error">
                {" "}
                <h3>{shows.Error}</h3>
            </div>
        );

    return (
        <div className="movie-wrapper">
            <div className="movie-list">
                <h2>Movies</h2>
                <div className="movie-container">
                    {" "}
                    <Slider {...settings}>{renderMovies}</Slider>
                </div>
            </div>

            <div className="show-list">
                <h2>Shows</h2>
                <div className="show-container">
                    <Slider {...settings}>{renderShows}</Slider>
                </div>
            </div>
        </div>
    );
};

export default MovieListing;
