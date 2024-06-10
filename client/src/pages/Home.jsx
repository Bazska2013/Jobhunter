import {Container, Row, Table} from "react-bootstrap";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/auth/authSlice.js";
import {useAllJobsQuery, useFilterJobsQuery} from "../features/jobs/jobsApiSlice.js";
import {useNavigate} from 'react-router-dom';
import LoaderAnimation from "../components/LoaderAnimation.jsx";
import ErrorCard from "../components/ErrorCard.jsx";
import FilterOffCanvas from "../components/unique/FilterOffCanvas.jsx";
import HomeSearch from "../components/unique/HomeSearch.jsx";

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


    const {data: allJobsResponse, isLoading: allJobsLoading, isError: allJobsError} = useAllJobsQuery();
    const {
        data: filteredJobsResponse = {},
        isLoading: filteredJobsLoading,
        isError: filteredJobsError
    } = useFilterJobsQuery(searchParams);

    const isFilterApplied = Object.keys(searchParams).length > 0;

    const jobs = isFilterApplied ? filteredJobsResponse?.data : allJobsResponse?.data;
    const isLoading = isFilterApplied ? filteredJobsLoading : allJobsLoading;
    const isError = isFilterApplied ? filteredJobsError : allJobsError;

    return (
        <>
            <FilterOffCanvas show={show} onHide={() => {
                setShow(false)
            }} search={search} onChange={(e) => {
                handleSearchChange("salaryFrom", e.target.value)
            }} onChange1={(e) => {
                handleSearchChange("salaryTo", e.target.value)
            }} onChange2={(e) => {
                handleSearchChange("type", e.target.value)
            }} onChange3={(e) => {
                handleSearchChange("city", e.target.value)
            }} onChange4={(e) => {
                handleSearchChange("homeOffice", e.target.value)
            }} onClick={handleSend} onClick1={handleFilterDelete}/>
            <Container style={{
                border: "#f8c124 1px solid",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "#ddac25 0 0 10px"
            }}>
                <Row>
                    <h1>Böngéssz az állások között:</h1>
                </Row>
                <HomeSearch onChange={(e) => {
                    handleSearchChange("company", e.target.value)
                }} onClick={handleSend} user={user} onClick1={() => {
                    setShow(true)
                }}/>
            </Container>
            {isLoading === true ? <>
                <LoaderAnimation/>
            </> : (isError === true ? <>
                    <ErrorCard onClick={() => {
                        navigate(0)
                    }}/>
                </> : <>
                    <Container style={{
                        border: "#f8c124 1px solid",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        boxShadow: "#ddac25 0 0 10px"
                    }}>
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
                                    <tr key={job.id} onClick={() => {
                                        navigate('/job/' + job.id)
                                    }}>
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