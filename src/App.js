import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import Home from "./components/Home/Home";
import MovieLayout from "./components/MovieLayout/MovieLayout";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Home />} />

                        <Route path="movie" element={<MovieLayout />}>
                            <Route path=":imdbId" element={<MovieDetail />} />
                        </Route>

                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
