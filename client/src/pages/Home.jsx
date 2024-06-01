import {Col, Container, InputGroup, Row, Form, Button, Table, Offcanvas} from "react-bootstrap";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import NavBar from "../components/NavBar.jsx";
import {selectCurrentUser} from "../features/auth/authSlice.js";
import {useAllJobsQuery} from "../features/jobs/jobsApiSlice.js";

const Home = () => {
    const [show, setShow] = useState(false);
    let user = useSelector(selectCurrentUser);

    const { data: response, isLoading, isError } = useAllJobsQuery();
    const jobs = response?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading jobs</div>;
    }

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
                        {user && <Button variant="light" onClick={() => {setShow(true)}}>Szűrés</Button>}
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
                    {Array.isArray(jobs) && jobs.map((job) => (
                        <tr key={job.id}>
                            <td>
                                <p>{job.company}</p>
                                <p>{job.city}</p>
                            </td>
                            <td>
                                <p>{job.salaryFrom}-{job.salaryTo} Ft.</p>
                                <p>{job.type}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Home;