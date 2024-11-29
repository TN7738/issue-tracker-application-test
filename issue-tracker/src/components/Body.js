import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Body = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default Body;
