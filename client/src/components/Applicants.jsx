import {Button, Col, Container, Row, Table} from "react-bootstrap";
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
        <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
            {applicants.length > 0 ? <>
                <Row>
                    <Col>
                        <h2>Jelentkezők</h2>
                    </Col>
                </Row>
                {applicants.map((applicant) => (
                    <Table key={applicant.userId} style={{marginTop: "20px"}} striped responsive hover>
                        <tbody>
                            <tr onClick={() => {handleApplicantProfile(applicant)}}>
                                <td>
                                    {applicant.user.fullname}
                                </td>
                                <td>
                                    {applicant.user.email}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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