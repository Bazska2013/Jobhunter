import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useApplicantsForAJobQuery} from "../features/jobs/applicantsApiSlice.js";
import {useDispatch} from "react-redux";
import {setData, showApplicant} from "../features/modals/showApplicantModalSlice.js";

const Applicants = ({id}) => {
    const [applicants, setApplicants] = useState([]);
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useApplicantsForAJobQuery({jobId: id});

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setApplicants(data);
        }
    }, [data, isLoading, isError]);

    const handleApplicantProfile = (applicant) => {
        dispatch(setData(applicant));
        dispatch(showApplicant());
    }

    return (
        <Container>
            {applicants.length > 0 ? <>
                <Row>
                    <Col>
                        <h2>Jelentkezők</h2>
                    </Col>
                </Row>
                {applicants.map((applicant) => (
                    <Row key={applicant.userId}>
                        <Col>
                            <p>{applicant.user.fullname}</p>
                        </Col>
                        <Col>
                            <p>{applicant.user.email}</p>
                        </Col>
                        <Col>
                            <Button onClick={() => {handleApplicantProfile(applicant)}} variant="outline-primary">Jelentkező profilja</Button>
                        </Col>
                    </Row>
                ))}
            </> : <>
                <Row>
                    <Col>
                        <p>Egyenlőre nem jelentkezett senki erre az állásra</p>
                    </Col>
                </Row>
            </>}
        </Container>
    )
}

export default Applicants;