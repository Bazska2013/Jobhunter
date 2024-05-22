import {Col, Container, InputGroup, Row, Form, Button, Table, Offcanvas} from "react-bootstrap";
import {useState} from "react";

const Home = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Offcanvas show={show} onHide={() => {setShow(false)}} placement="end" >
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>Szűrés</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Group>
                        <Form.Label>Fizetési sáv alja</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fizetési sáv teteje</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Foglalkoztatás típusa</Form.Label>
                        <Form.Select aria-label="Foglalkoztatás formája">
                            <option value="1">Teljes állás (full-time)</option>
                            <option value="2">Részmunkaidős (part-time)</option>
                            <option value="3">Gyakornoki (internship)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Település</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Check id="home_office" type="checkbox" label="Home Office" />
                </Offcanvas.Body>
            </Offcanvas>
            <Container>
                <h1>Főoldal</h1>
            </Container>
            <Container>
                <Row>
                    <h2>Böngéssz az állások között:</h2>
                </Row>
                <Row>
                    <Col>
                        <Form.Control type="text" placeholder="Keresés" />
                    </Col>
                    <Col>
                        <Button variant="primary">Keresés</Button>
                        <Button variant="light" onClick={() => {setShow(true)}}>Szűrés</Button>
                    </Col>
                </Row>
            </Container>
            <Table>
                <thead>
                    <tr>
                        <th>ÁLLÁS NEVE</th>
                        <th>BÉREZÉS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>Regional Paradign Technician</p>
                            <p>Budapest</p>
                        </td>
                        <td>
                            <p>500.000-1M Ft.</p>
                            <p>Teljes munkaidős</p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Home;