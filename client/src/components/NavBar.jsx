import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout, selectCurrentUser} from "../features/auth/authSlice.js";

const NavBar = () => {
    let user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <Navbar>
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>Jobhunter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user ? ( <>
                            <Nav.Link onClick={() => navigate("/")}>Álláshirdetések</Nav.Link>
                            <Nav.Link onClick={() => navigate("/profile")}>Profilom</Nav.Link>
                            <Nav.Link onClick={() => navigate("/editjob")}>Álláshirdetés hozzáadása</Nav.Link>
                            <Nav.Link onClick={handleLogout} >Kijelentkezés</Nav.Link>
                        </>) : (<>
                            <Nav.Link onClick={() => navigate("/register")}>Regisztráció</Nav.Link>
                            <Nav.Link onClick={() => navigate("/login")}>Bejelentkezés</Nav.Link>
                        </>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;