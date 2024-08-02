import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Body = () => {
    return (
        <>
            <Header />
            <div className="main-content py-5">
                <Container>
                    <Outlet />
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Body;
