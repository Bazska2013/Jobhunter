import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice"
import {useDeleteJobMutation, useFilterJobsQuery} from '../../features/jobs/jobsApiSlice';
import {useNavigate} from 'react-router-dom';
import LoaderAnimation from "../../components/LoaderAnimation.jsx";
import ErrorCard from "../../components/ErrorCard.jsx";
import {setSuccessMessage, show} from "../../features/modals/showModalSlice.js";

export const Profile = () => {
    let user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [deleteJob] = useDeleteJobMutation();
    const dispatch = useDispatch();

    const {
        data: allJobsResponse,
        isLoading: allJobsLoading,
        isError: allJobsError
    } = useFilterJobsQuery({'userId': user.id});

    const jobs = allJobsResponse?.data;

    const handleDelete = async (id) => {
        try {
            await deleteJob(id).unwrap();
        } catch (error) {
            console.error(error);
        }
        navigate(0);
        setSuccessMessage("Sikeres törlés!");
        dispatch(show());
    }

    return (
        <div>
            <Container style={{
                border: "#f8c124 1px solid",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "#ddac25 0 0 10px"
            }}>
                <h1>Profilom</h1>
            </Container>
            {allJobsLoading === true ? <><LoaderAnimation/></> : (allJobsError === true ? <>
                <ErrorCard onClick={() => {
                    navigate(0)
                }}/>
            </> : <>
                {Array.isArray(jobs) && jobs.map((job) => (
                    <Container key={job.id} style={{
                        border: "#f8c124 1px solid",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        boxShadow: "#ddac25 0 0 10px"
                    }}>
                        <Row>
                            <Col xs={6}>
                                <h2>{job.position}</h2>
                            </Col>
                            <Col>
                                <span>{job.type === "full-time" ? "Teljes állás" : (job.type === "part-time" ? "Részmunkaidő" : "Gyakornoki")}</span>
                            </Col>
                            <Col>
                                <span>{job.homeOffice === 0 ? "Nincs Home Office" : "Van Home Office"}</span>
                            </Col>
                            <Col>
                                <span>{job.salaryFrom}-{job.salaryTo} Ft.</span>
                            </Col>
                        </Row>
                        <Row>
                            <Row style={{textAlign: "center"}}>
                                <Col xs>
                                    <Button variant="light" onClick={() => {
                                        navigate('/editjob/' + job.id)
                                    }}>Szerkesztés</Button>
                                </Col>
                                <Col xs>
                                    <Button variant="light" onClick={() => {
                                        navigate('/job/' + job.id)
                                    }}>Megtekintés</Button>
                                </Col>
                                <Col xs>
                                    <Button variant="custom_danger" onClick={() => {
                                        handleDelete(job.id)
                                    }}>Törlés</Button>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                ))}
            </>)}
            <Button variant="custom_primary" onClick={() => {
                navigate('/newjob')
            }}>Hirdetés hozzáadása</Button>
        </div>
    )
}