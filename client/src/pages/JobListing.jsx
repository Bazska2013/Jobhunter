import {Button, Col, Container, Row, Table} from "react-bootstrap";
import NavBar from "../components/NavBar.jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOneJobQuery } from "../features/jobs/jobsApiSlice.js";

const JobListing = () => {
    let { id } = useParams();

    const [job, setJob] = useState({});

    const { data, isLoading, isError } = useOneJobQuery(id);

    useEffect(() => {
        if (id && !isLoading && !isError) {
            setJob(data);
        }
    }, [id, data, isLoading, isError]);

    return (
        <>
            <Container>
                <h1>{job.company}</h1>
                <p>Home Office: {job.homeOffice}</p>
                <div>
                    <p>{job.salaryFrom}-{job.salaryTo} Ft.</p>
                    <p>{job.type}</p>
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
                            <td>{job.company}</td>
                        </tr>
                        <tr>
                            <td>Pozíció</td>
                            <td>{job.position}</td>
                        </tr>
                        <tr>
                            <td>Leírás</td>
                            <td>{job.description}</td>
                        </tr>
                        <tr>
                            <td>Fizetési sáv</td>
                            <td>{job.salaryFrom}-{job.salaryTo} Ft.</td>
                        </tr>
                        <tr>
                            <td>Foglalkoztatás típusa</td>
                            <td>{job.type}</td>
                        </tr>
                        <tr>
                            <td>Telephely</td>
                            <td>{job.city}</td>
                        </tr>
                        <tr>
                            <td>Home Office</td>
                            <td>{job.homeOffice}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default JobListing;