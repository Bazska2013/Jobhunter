import {Col, Container, InputGroup, Row, Form, Button, Table, Offcanvas} from "react-bootstrap";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/auth/authSlice.js";
import {useAllJobsQuery, useFilterJobsQuery} from "../features/jobs/jobsApiSlice.js";

const Home = () => {
    const [show, setShow] = useState(false);

    const [search, setSearch] = useState({
        company: "",
        salaryFrom: "",
        salaryTo: "",
        type: "",
        city: "",
        homeOffice: false,
    });

    const handleSearchChange = (t, value) => {
        switch (t) {
            case "company":
                setSearch({...search, company: value});
                break;
            case "salaryFrom":
                setSearch({...search, salaryFrom: value});
                break;
            case "salaryTo":
                setSearch({...search, salaryTo: value});
                break;
            case "type":
                setSearch({...search, type: value});
                break;
            case "city":
                setSearch({...search, city: value});
                break;
            case "homeOffice":
                setSearch({...search, homeOffice: value});
                break;
            default:
                break;
        }
    }

    const handleSend = () => {
        let sendValues = {};
        for (const [key, value] of Object.entries(search)) {
            if (value) {
                switch (key) {
                    case 'company':
                        sendValues['company[$like]'] = `%${value}%`;
                        break;
                    case 'salaryFrom':
                        sendValues['salaryFrom[$gte]'] = value;
                        break;
                    case 'salaryTo':
                        sendValues['salaryTo[$lte]'] = value;
                        break;
                    case 'type':
                        sendValues['type'] = value;
                        break;
                    case 'city':
                        sendValues['city'] = value;
                        break;
                    case 'homeOffice':
                        sendValues['homeOffice'] = value === 'true';
                        break;
                    default:
                        break;
                }
            }
        }
        setSearchParams(sendValues);
    }

    const handleFilterDelete = () => {
        setSearchParams({});
        setSearch({
            company: "",
            salaryFrom: "",
            salaryTo: "",
            type: "",
            city: "",
            homeOffice: false,
        });
    }

    let user = useSelector(selectCurrentUser);

    const [searchParams, setSearchParams] = useState({});


    const { data: allJobsResponse, isLoading: allJobsLoading, isError: allJobsError } = useAllJobsQuery();
    const { data: filteredJobsResponse = {}, isLoading: filteredJobsLoading, isError: filteredJobsError } = useFilterJobsQuery(searchParams);


    // const handleSearchChange = (e) => {
    //     const value = e.target.value;
    //     setSearchParams(value ? { 'company[$like]': `%${value}%` } : {});
    // };

    const isFilterApplied = Object.keys(searchParams).length > 0;

    const jobs = isFilterApplied ? filteredJobsResponse?.data : allJobsResponse?.data;
    const isLoading = isFilterApplied ? filteredJobsLoading : allJobsLoading;
    const isError = isFilterApplied ? filteredJobsError : allJobsError;

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
                        <Form.Control type="number" value={search.salaryFrom} onChange={(e) => {handleSearchChange("salaryFrom", e.target.value)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fizetési sáv teteje</Form.Label>
                        <Form.Control type="number" value={search.salaryTo} onChange={(e) => {handleSearchChange("salaryTo", e.target.value)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Foglalkoztatás típusa</Form.Label>
                        <Form.Select aria-label="Foglalkoztatás formája" value={search.type} onChange={(e) => {handleSearchChange("type", e.target.value)}}>
                            <option value="full-time">Teljes állás (full-time)</option>
                            <option value="part-time">Részmunkaidős (part-time)</option>
                            <option value="internship">Gyakornoki (internship)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Település</Form.Label>
                        <Form.Control type="text" value={search.city} onChange={(e) => {handleSearchChange("city", e.target.value)}} />
                    </Form.Group>
                    <Form.Check id="home_office" value={search.homeOffice} type="checkbox" label="Home Office" onChange={(e) => {handleSearchChange("homeOffice", e.target.value)}} />
                    <Button variant="primary" onClick={handleSend}>Keresés</Button>
                    <Button variant="danger" onClick={handleFilterDelete}>Szűrők törlése</Button>
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
                        <Form.Control type="text" placeholder="Keresés" onChange={(e) => {handleSearchChange("company", e.target.value)}} />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleSend}>Keresés</Button>
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