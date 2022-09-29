import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovieOrShowDetail } from "../../features/movies/movieSlice";
import { getSelectMovieOrShow } from "../../features/movies/movieSlice";

const MovieDetail = () => {
    const { imdbID } = useParams();
    console.log(imdbID);
    const dispatch = useDispatch();

    // useSelector for the movie or show
    const data = useSelector(getSelectMovieOrShow);

    // useRef to deal with rerendering in React 18
    let fetchRef = useRef(true);

    useEffect(() => {
        if (fetchRef.current) {
            fetchRef.current = false;
            dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        }
    }, [dispatch, imdbID]);

    console.log(data);

    return (
        <div className="movie-section">
            <div className="section-left">
                <div className="movie-title">{data.Title}</div>
                <div className="movie-rting">
                    <span>
                        IMDB Rating <i className="fa fa-star"></i> :{" "}
                        {data.imdbRating}
                    </span>
                    <span>
                        IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                        {data.imdbVotes}
                    </span>
                    <span>
                        Runtine <i className="fa fa-film"></i> :{" "}
                        {data.imdbRuntime}
                    </span>
                    <span>
                        Year <i className="fa fa-calendar"></i> : {data.Year}
                    </span>
                </div>
                <div className="movie-plot">{data.Plot}</div>
                <div className="movie-info">
                    <div>
                        <span>Director</span>
                        <span>{data.Director}</span>
                    </div>
                    <div>
                        <span>Stars</span>
                        <span>{data.Actors}</span>
                    </div>
                    <div>
                        <span>Genre</span>
                        <span>{data.Genre}</span>
                    </div>
                    <div>
                        <span>Languages</span>
                        <span>{data.Language}</span>
                    </div>
                    <div>
                        <span>Awards</span>
                        <span>{data.Awards}</span>
                    </div>
                </div>
            </div>
            <div className="section-right">
                <img src={data.Poster} alt={data.Title} />
            </div>
        </div>
    );
};

export default MovieDetail;
