import {Button, Col, Container, Row, Table} from "react-bootstrap";
import NavBar from "../components/NavBar.jsx";
import React from "react";

const JobListing = () => {
    return (
        <>
            <Container>
                <h1>Halo Haven Kft.</h1>
                <p>Home Office</p>
                <div>
                    <p>500.000-1M Ft.</p>
                    <p>Teljes munkaidős</p>
                </div>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <h2>Cég részletei</h2>
                        <p>Megtetszett a lehetőség? Jelentkezz!</p>
                    </Col>
                    <Col>
                        <Button variant="primary">Jelentkezés</Button>
                    </Col>
                </Row>
                <Table striped responsive>
                    <tbody>
                        <tr>
                            <td>Név</td>
                            <td>Halo Haven</td>
                        </tr>
                        <tr>
                            <td>Pozíció</td>
                            <td>Sales Assistant</td>
                        </tr>
                        <tr>
                            <td>Leírás</td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</td>
                        </tr>
                        <tr>
                            <td>Fizetési sáv</td>
                            <td>Bruttó 1.1-1.4 M</td>
                        </tr>
                        <tr>
                            <td>Foglalkoztatás típusa</td>
                            <td>Gyakornok</td>
                        </tr>
                        <tr>
                            <td>Telephely</td>
                            <td>Vanyerc</td>
                        </tr>
                        <tr>
                            <td>Home Office</td>
                            <td>Van</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default JobListing;