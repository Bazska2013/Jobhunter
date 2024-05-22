import {Button, Container, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/auth/authorizedSlice.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authorized = useSelector((state) => state.authorized.value);
    const [show, setShow] = useState(false)

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setShow(true);
    }

    return (
        <Navbar>
            <Modal show={show} onHide={() => {setShow(false)}}>
                <Modal.Header >
                    <Modal.Title>Sikeres kijelentkezés!</Modal.Title>
                    <Modal.Footer><Button variant="primary" onClick={() => {setShow(false)}}>Bezárás</Button></Modal.Footer>
                </Modal.Header>
            </Modal>
            <Container>
                <Navbar.Brand href="/">Jobhunter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {authorized ? ( <>
                            <Nav.Link href="/">Álláshirdetések</Nav.Link>
                            <Nav.Link href="/profile">Profilom</Nav.Link>
                            <Nav.Link href="/editjob">Álláshirdetés hozzáadása</Nav.Link>
                            <Nav.Link onClick={handleLogout} >Kijelentkezés</Nav.Link>
                        </>) : (<>
                            <Nav.Link href="/register">Regisztráció</Nav.Link>
                            <Nav.Link href="/login">Bejelentkezés</Nav.Link>
                        </>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;