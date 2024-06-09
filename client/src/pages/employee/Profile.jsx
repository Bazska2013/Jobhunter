import {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice.js";
import {useJobsForAnApplicantQuery} from "../../features/jobs/applicantsApiSlice.js";
import {useNavigate} from "react-router-dom";
import {setData, showModifyExperiences} from "../../features/modals/showModifyExperiencesModalSlice.js";
import {useGetExperiencesQuery} from "../../features/jobs/experiencesApiSlice.js";
import ModifyExperiencesModal from "../../components/modals/ModifyExperiencesModal.jsx";
import LoaderAnimation from "../../components/LoaderAnimation.jsx";
import ErrorCard from "../../components/ErrorCard.jsx";

export const Profile = () => {
    let user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const {data, isLoading, isError} = useJobsForAnApplicantQuery({userId: user.id});
    const {data: experiencesData, isLoading: experiencesIsLoading, isError: experiencesIsError, refetch} = useGetExperiencesQuery();

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setJobs(data);
        }
    }, [data, isLoading, isError]);

    useEffect(() => {
        if (experiencesData && !experiencesIsLoading && !experiencesIsError) {
            setExperiences(experiencesData.data);
        }
    }, [experiencesData, experiencesIsLoading, experiencesIsError]);

    const handleExperienceModal = () => {
        dispatch(setData(experiences));
        dispatch(showModifyExperiences());
    }

    const handleRefetch = () => {
        refetch();
    };

    return (
        <div>
            <ModifyExperiencesModal onMutation={handleRefetch} />
            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                <h1>Profilom</h1>
            </Container>
            {isLoading === true ? <LoaderAnimation /> : (isError === true ? <ErrorCard onClick={() => {
                navigate(0)
            }}/> : <>
                <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                    <Row>
                        <Col>
                            <Row>
                                <h2>Személyes adatok</h2>
                            </Row>
                            <Row>
                                <p>Adataid és tapasztalataid egy helyen</p>
                            </Row>
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="custom_primary" onClick={() => {handleExperienceModal()}}>Tapasztalatok szerkesztése</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table style={{marginTop: "20px"}} striped responsive>
                            <tbody>
                            <tr>
                                <td>
                                    Név
                                </td>
                                <td>
                                    {user.fullname}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    E-mail
                                </td>
                                <td>
                                    {user.email}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Státusz
                                </td>
                                <td>
                                    {user.role === "jobseeker" ? "Munkavállaló" : "Munkáltató"}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <h3>Korábbi tapasztalatok</h3>
                    </Row>
                    <Row>
                        <Table style={{marginTop: "20px"}} striped responsive>
                            <tbody>
                            {Array.isArray(experiences) && experiences.map((experience) => (
                                <tr key={experience.id}>
                                    <td>{experience.company}</td>
                                    <td>{experience.interval}</td>
                                    <td>{experience.title}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                    {jobs.length > 0 ? <>
                        <Row>
                            <Col>
                                <h2>Jelentkezések</h2>
                            </Col>
                        </Row>
                        {jobs.map((job) => (
                            <Row style={{borderTop: "#7c8c94 1px solid", borderBottom: "#7c8c94 1px solid", textAlign: "center"}} key={job.jobId}>
                                <Col>
                                    <p>{job.job.company}</p>
                                </Col>
                                <Col>
                                    <p>{job.job.position}</p>
                                </Col>
                                <Col>
                                    <Button onClick={() => {navigate('/job/'+job.jobId)}} variant="custom_outline-primary">Állás részletei</Button>
                                </Col>
                            </Row>
                        ))}
                    </> : <></>}
                </Container>
            </> )}
        </div>
    )
}