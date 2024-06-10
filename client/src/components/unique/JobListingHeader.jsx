import {Button, Col, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";

function JobListingHeader(props) {
    return <Row>
        <Col>
            <Row>
                <h2>Cég részletei</h2>
            </Row>
            <Row>
                <p>Megtetszett a lehetőség? Jelentkezz!</p>
            </Row>
        </Col>
        {props.user.role === "company" ? (props.job.userId === props.user.id ? <>
            <Col style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant="custom_primary" onClick={props.onClick}>Szerkesztés</Button>
            </Col>
        </> : <></>) : <>
            <Col style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                {props.alreadyApplied ? <>
                    <Button variant="custom_primary" onClick={props.onClick1}>Jelentkezés visszavonása</Button>
                </> : <>
                    <Button variant="custom_primary" onClick={props.onClick2}>Jelentkezés</Button>
                </>}
            </Col>
        </>}
    </Row>;
}

JobListingHeader.propTypes = {
    user: PropTypes.any,
    job: PropTypes.shape({}),
    onClick: PropTypes.func,
    alreadyApplied: PropTypes.bool,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func
};

export default JobListingHeader;