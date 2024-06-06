import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice"
import { useFilterJobsQuery } from '../../features/jobs/jobsApiSlice';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    let user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const { data: allJobsResponse, isLoading: allJobsLoading, isError: allJobsError} = useFilterJobsQuery({'userId' : user.id});

    const jobs = allJobsResponse?.data;

    return (
        <div>
            <Container>
                <h1>Profilom</h1>
            </Container>
            {Array.isArray(jobs) && jobs.map((job) => (
                <Container key={job.id} >
                    <Row>
                        <Col>
                            <h2>{job.position}</h2>
                        </Col>
                        <Col>
                            <Button variant="light" onClick={() => {navigate('/editjob/'+job.id)}} >Szerkesztés</Button>
                            <Button variant="light">Megtekintés</Button>
                            <Button variant="danger">Törlés</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <span>{job.type}</span>
                        <span>{job.homeOffice}</span>
                        <span>{job.salaryFrom}-{job.salaryTo} Ft.</span>
                        <span>Closing on January 9. 20:20</span>
                        </Col>
                    </Row>
                </Container>
            ))}
            <Button variant="primary" onClick={() => {navigate('/newjob')}} >Hirdetés hozzáadása</Button>
        </div>
    )
}