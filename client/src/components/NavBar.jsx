import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout, selectCurrentUser} from "../features/auth/authSlice.js";
import {useEffect, useState} from "react";
import {setSuccessMessage, show} from "../features/modals/showModalSlice.js";
import logo from "../assets/logo.svg";

const NavBar = () => {
    let user = useSelector(selectCurrentUser);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        if (user) {
            setUserType(user.role);
        }
    }, [user]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setSuccessMessage("Sikeres kijelentkezés"));
        dispatch(show());
    }
    return (
        <Navbar expand="lg" fixed="top">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>
                    <img
                        alt="Jobhunter"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}Jobhunter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" variant="underline">
                        {user ? (<>
                            <Nav.Link onClick={() => navigate("/")}>Álláshirdetések</Nav.Link>
                            <Nav.Link onClick={() => navigate("/profile")}>Profilom</Nav.Link>
                            {userType === "company" &&
                                <Nav.Link onClick={() => navigate("/newjob")}>Álláshirdetés hozzáadása</Nav.Link>}
                            <Nav.Link onClick={handleLogout}>Kijelentkezés</Nav.Link>
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