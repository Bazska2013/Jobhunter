import {Button, Col, Container, Row, Table} from "react-bootstrap";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useOneJobQuery } from "../features/jobs/jobsApiSlice.js";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {
    useApplicantsForAJobQuery,
    useApplyForJobMutation,
    useDeleteApplicationFromAJobMutation
} from "../features/jobs/applicantsApiSlice.js";
import {setSuccessMessage, show} from "../features/modals/showModalSlice.js";
import Applicants from "../components/Applicants.jsx";

const JobListing = () => {
    const dispatch = useDispatch();
    let user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [ applyForJob ] = useApplyForJobMutation();
    const [ deleteApply ] = useDeleteApplicationFromAJobMutation();
    let { id } = useParams();
    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const [job, setJob] = useState({});

    const { data, isLoading, isError } = useOneJobQuery(id);

    const {data: jobApplicants, refetch: refetchApplicants} = useApplicantsForAJobQuery({jobId: id});

    useEffect(() => {
        if (jobApplicants && jobApplicants.length > 0) {
            jobApplicants.forEach(applicant => {
                if (applicant.userId === user.id) {
                    setAlreadyApplied(true);
                }
            });
        }
    }, [jobApplicants, user.id, refetchApplicants]);

    useEffect(() => {
        if (id && !isLoading && !isError) {
            setJob(data);
        }
    }, [id, data, isLoading, isError]);

    const handleApply = async () => {
        try {
            await applyForJob({
                jobId: Number(id),
            }).unwrap();
            dispatch(setSuccessMessage("Sikeres jelentkezés"));
            dispatch(show());
            refetchApplicants();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveApply = async () => {
        try {
            await deleteApply({
                jobId: Number(id),
            }).unwrap();
            // console.log(result);
            dispatch(setSuccessMessage("Sikeres lejelentkezés"));
            dispatch(show());
            refetchApplicants();
            setAlreadyApplied(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                <Row><h1>{job.company}</h1></Row>
                <Row><p>Home Office: {job.homeOffice === 0 ? "Nincs" : "Van"}</p></Row>
                <Row><p>{job.salaryFrom}-{job.salaryTo} Ft.</p></Row>
                <Row><p>{job.type === "full-time" ? "Teljes állás" : (job.type === "part-time" ? "Részmunkaidő" : "Gyakornoki")}</p></Row>
            </Container>
            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                <Row>
                    <Col>
                        <Row>
                            <h2>Cég részletei</h2>
                        </Row>
                        <Row>
                            <p>Megtetszett a lehetőség? Jelentkezz!</p>
                        </Row>
                    </Col>
                    {user.role === "company" ? (job.userId === user.id ? <>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="custom_primary" onClick={() => {navigate('/editjob/'+id)}} >Szerkesztés</Button>
                        </Col>
                    </> : <></>) : <>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {alreadyApplied ? <>
                                <Button variant="custom_primary" onClick={() => {handleRemoveApply()}}>Jelentkezés visszavonása</Button>
                            </> : <>
                                <Button variant="custom_primary" onClick={() => {handleApply()}}>Jelentkezés</Button>
                            </>}
                        </Col>
                    </>}
                </Row>
                <Row>
                    <Table style={{marginTop: "20px"}} striped responsive>
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
                            <td>{job.type === "full-time" ? "Teljes állás" : (job.type === "part-time" ? "Részmunkaidő" : "Gyakornoki")}</td>
                        </tr>
                        <tr>
                            <td>Telephely</td>
                            <td>{job.city}</td>
                        </tr>
                        <tr>
                            <td>Home Office</td>
                            <td>{job.homeOffice === 0 ? "Nincs" : "Van"}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {user.role === "company" && job.userId === user.id ? <Applicants id={id} />: <></>}
        </>
    );
}

export default JobListing;