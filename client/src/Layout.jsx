import NavBar from "./components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
import SuccessModal from "./components/SuccessModal.jsx";
import React from "react";

export const Layout = () => {
    return (
        <Container>
            <SuccessModal />
            <NavBar/>
            <Outlet/>
        </Container>
    );
};