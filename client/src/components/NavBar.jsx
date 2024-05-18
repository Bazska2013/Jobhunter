import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Jobhunter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Álláshirdetések</Nav.Link>
                        <Nav.Link href="/register">Regisztráció</Nav.Link>
                        <Nav.Link href="/login">Bejelentkezés</Nav.Link>
                        <Nav.Link href="/profile">Profilom</Nav.Link>
                        <Nav.Link href="/editjob">Álláshirdetés hozzáadása</Nav.Link>
                        <Nav.Link>Kijelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;