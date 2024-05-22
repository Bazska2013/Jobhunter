import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import NavBar from "../../components/NavBar.jsx";

export const Profile = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <h1>Profilom</h1>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h2>Back End Developer</h2>
                    </Col>
                    <Col>
                        <Button variant="light">Szerkesztés</Button>
                        <Button variant="light">Megtekintés</Button>
                        <Button variant="danger">Törlés</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>Full-time</span>
                        <span>Remote</span>
                        <span>$120k - $140k</span>
                        <span>Closing on January 9. 20:20</span>
                    </Col>
                </Row>
            </Container>
            <Button variant="primary">Hirdetés hozzáadása</Button>
        </div>
    )
}