import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../App.scss";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <div className="outletContainer">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default HomeLayout;
