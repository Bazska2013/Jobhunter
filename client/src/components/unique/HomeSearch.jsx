import {Button, Col, Form, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";

function HomeSearch(props) {
    return <Row>
        <Col sm={8}>
            <Form.Control type="text" placeholder="Keresés" onChange={props.onChange}/>
        </Col>
        <Col style={{textAlign: "center"}}>
            <Button variant="custom_primary" onClick={props.onClick}>Keresés</Button>
        </Col>
        {props.user && <>
            <Col style={{textAlign: "center"}}>
                <Button variant="light" onClick={props.onClick1}>Szűrés</Button>
            </Col>
        </>}
    </Row>;
}

HomeSearch.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    user: PropTypes.any,
    onClick1: PropTypes.func
};

export default HomeSearch;