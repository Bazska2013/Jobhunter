import NavBar from "./components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
import SuccessModal from "./components/modals/SuccessModal.jsx";
import React from "react";
import ApplicantModal from "./components/modals/ApplicantModal.jsx";
import ModifyExperiencesModal from "./components/modals/ModifyExperiencesModal.jsx";

export const Layout = () => {
    return (
        <Container>
            <SuccessModal />
            <ApplicantModal />
            <ModifyExperiencesModal />
            <NavBar/>
            <Outlet/>
        </Container>
    );
};