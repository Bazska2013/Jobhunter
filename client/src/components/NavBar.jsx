import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/auth/authorizedSlice.js";
import {useNavigate} from "react-router-dom";
import {show as logoutShow, hide as logoutHide} from "../features/auth/logoutModalSlice.js";
import {show as loginShow, hide as loginHide} from "../features/auth/loginModalSlice.js";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authorized = useSelector((state) => state.authorized.value);
    const logoutModal = useSelector((state) => state.logoutModal.value);
    const loginModal = useSelector((state) => state.loginModal.value);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        dispatch(logoutShow());
    }

    return (
        <Navbar>
            <Modal show={logoutModal} onHide={() => dispatch(logoutHide())}>
                <Modal.Header >
                    <Modal.Title>Sikeres kijelentkezés!</Modal.Title>
                    <Modal.Footer><Button variant="primary" onClick={() => dispatch(logoutHide())}>Bezárás</Button></Modal.Footer>
                </Modal.Header>
            </Modal>
            <Modal show={loginModal} onHide={() => dispatch(loginHide())}>
                <Modal.Header >
                    <Modal.Title>Sikeres bejelentkezés!</Modal.Title>
                    <Modal.Footer><Button variant="primary" onClick={() => dispatch(loginHide())}>Bezárás</Button></Modal.Footer>
                </Modal.Header>
            </Modal>
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>Jobhunter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {authorized ? ( <>
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