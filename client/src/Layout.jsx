import NavBar from "./components/NavBar.jsx";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";

export const Layout = () => {
    return (
        <Container>
            <NavBar/>
            <Outlet/>
        </Container>
    );
};