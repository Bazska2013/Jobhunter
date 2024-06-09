import {Col, Container, Row, Form, Button, Table, Offcanvas} from "react-bootstrap";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/auth/authSlice.js";
import {useAllJobsQuery, useFilterJobsQuery} from "../features/jobs/jobsApiSlice.js";
import { useNavigate } from 'react-router-dom';
import LoaderAnimation from "../components/LoaderAnimation.jsx";
import ErrorCard from "../components/ErrorCard.jsx";

const Home = () => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

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
        setShow(false);
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

    const isFilterApplied = Object.keys(searchParams).length > 0;

    const jobs = isFilterApplied ? filteredJobsResponse?.data : allJobsResponse?.data;
    const isLoading = isFilterApplied ? filteredJobsLoading : allJobsLoading;
    const isError = isFilterApplied ? filteredJobsError : allJobsError;

        return (
        <>
            <Offcanvas show={show} onHide={() => {setShow(false)}} placement="end" >
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>Szűrés</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Group style={{marginTop: "20px"}}>
                        <Form.Label>Fizetési sáv alja</Form.Label>
                        <Form.Control type="number" value={search.salaryFrom} onChange={(e) => {handleSearchChange("salaryFrom", e.target.value)}} />
                    </Form.Group>
                    <Form.Group style={{marginTop: "20px"}}>
                        <Form.Label>Fizetési sáv teteje</Form.Label>
                        <Form.Control type="number" value={search.salaryTo} onChange={(e) => {handleSearchChange("salaryTo", e.target.value)}} />
                    </Form.Group>
                    <Form.Group style={{marginTop: "20px"}}>
                        <Form.Label>Foglalkoztatás típusa</Form.Label>
                        <Form.Select aria-label="Foglalkoztatás formája" value={search.type} onChange={(e) => {handleSearchChange("type", e.target.value)}}>
                            <option value="full-time">Teljes állás (full-time)</option>
                            <option value="part-time">Részmunkaidős (part-time)</option>
                            <option value="internship">Gyakornoki (internship)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group style={{marginTop: "20px"}}>
                        <Form.Label>Település</Form.Label>
                        <Form.Control type="text" value={search.city} onChange={(e) => {handleSearchChange("city", e.target.value)}} />
                    </Form.Group>
                    <Form.Check style={{marginTop: "20px"}} id="home_office" value={!search.homeOffice} type="checkbox" label="Home Office lehetőség" onChange={(e) => {handleSearchChange("homeOffice", e.target.value)}} />
                    <Row style={{textAlign: "center", marginTop: "20px"}}>
                        <Col>
                            <Button variant="custom_primary" onClick={handleSend}>Keresés</Button>
                        </Col>
                        <Col>
                            <Button variant="custom_danger" onClick={handleFilterDelete}>Szűrők törlése</Button>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                <Row>
                    <h1>Böngéssz az állások között:</h1>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Keresés" onChange={(e) => {handleSearchChange("company", e.target.value)}} />
                    </Col>
                    <Col style={{textAlign: "center"}}>
                        <Button variant="custom_primary" onClick={handleSend}>Keresés</Button>
                    </Col>
                    {user && <>
                        <Col style={{textAlign: "center"}}>
                            <Button variant="light" onClick={() => {setShow(true)}}>Szűrés</Button>
                        </Col>
                    </>}
                </Row>
            </Container>
                    {isLoading === true ? <>
                        <LoaderAnimation/>
                    </> : (isError === true ? <>
                            <ErrorCard onClick={() => {
                                navigate(0)
                            }}/>
                        </> : <>
                            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                                <Row>
                                    <Table style={{marginTop: "20px"}} hover>
                                        <thead>
                                        <tr>
                                            <th>ÁLLÁS</th>
                                            <th>BÉREZÉS</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Array.isArray(jobs) && jobs.map((job) => (
                                            <tr key={job.id} onClick={() => {navigate('/job/'+job.id)}}>
                                                <td>
                                                    <h3>{job.company}</h3>
                                                    <p>{job.city}</p>
                                                </td>
                                                <td>
                                                    <h3>{job.salaryFrom}-{job.salaryTo} Ft.</h3>
                                                    <p>{job.type === "full-time" ? "Teljes állás" : (job.type === "part-time" ? "Részmunkaidő" : "Gyakornoki")}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Row>
                            </Container>

                        </>
                    )}
        </>
    )
}

export default Home;