import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import NavBar from "../../components/NavBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice.js";
import {useJobsForAnApplicantQuery} from "../../features/jobs/applicantsApiSlice.js";
import {useNavigate} from "react-router-dom";
import {setData, showModifyExperiences} from "../../features/modals/showModifyExperiencesModalSlice.js";
import {useGetExperiencesQuery} from "../../features/jobs/experiencesApiSlice.js";

export const Profile = () => {
    let user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const {data, isLoading, isError} = useJobsForAnApplicantQuery({userId: user.id});
    const {data: experiencesData, isLoading: experiencesIsLoading, isError: experiencesIsError} = useGetExperiencesQuery();

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setJobs(data);
        }
    }, [data, isLoading, isError]);

    useEffect(() => {
        if (experiencesData && !experiencesIsLoading && !experiencesIsError) {
            setExperiences(experiencesData);
        }
    }, [experiencesData, experiencesIsLoading, experiencesIsError]);

    const handleExperienceModal = () => {
        dispatch(setData(experiences));
        dispatch(showModifyExperiences());
    }

    return (
        <div>
            <h1>Profilom</h1>
            <Container>
                <Row>
                    <Col>
                        <h2>Személyes adatok</h2>
                        <p>Adataid és tapasztalataid egy helyen</p>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button onClick={() => {handleExperienceModal()}}>Tapasztalatok szerkesztése</Button>
                    </Col>
                </Row>
                <Table striped responsive>
                    <tbody>
                        <tr>
                            <td>
                                Név
                            </td>
                            <td colSpan={2}>
                                {user.fullname}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                E-mail
                            </td>
                            <td colSpan={2}>
                                {user.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Státusz
                            </td>
                            <td colSpan={2}>
                                {user.role}
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={3}>
                                Korábbi tapasztalatok
                            </th>
                        </tr>
                        <tr>
                            <td>Anonymus Kft.</td>
                            <td>2020-2024</td>
                            <td>Full Time Back end Developer</td>
                        </tr>
                    </tbody>
                </Table>
                {jobs.length > 0 ? <>
                    <Container>
                        <Row>
                            <Col>
                                <h2>Jelentkezések</h2>
                            </Col>
                        </Row>
                        {jobs.map((job) => (
                            <Row key={job.jobId}>
                                <Col>
                                    <p>{job.job.company}</p>
                                </Col>
                                <Col>
                                    <p>{job.job.position}</p>
                                </Col>
                                <Col>
                                    <Button onClick={() => {navigate('/job/'+job.jobId)}} variant="outline-primary">Állás részletei</Button>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </> : <></>}
            </Container>
        </div>
    )
}