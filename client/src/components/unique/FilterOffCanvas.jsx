import {Button, Col, Form, Offcanvas, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";

function FilterOffCanvas(props) {
    return <Offcanvas show={props.show} onHide={props.onHide} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Szűrés</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Form.Group style={{marginTop: "20px"}}>
                <Form.Label>Fizetési sáv alja</Form.Label>
                <Form.Control type="number" value={props.search.salaryFrom} onChange={props.onChange}/>
            </Form.Group>
            <Form.Group style={{marginTop: "20px"}}>
                <Form.Label>Fizetési sáv teteje</Form.Label>
                <Form.Control type="number" value={props.search.salaryTo} onChange={props.onChange1}/>
            </Form.Group>
            <Form.Group style={{marginTop: "20px"}}>
                <Form.Label>Foglalkoztatás típusa</Form.Label>
                <Form.Select aria-label="Foglalkoztatás formája" value={props.search.type} onChange={props.onChange2}>
                    <option value="full-time">Teljes állás (full-time)</option>
                    <option value="part-time">Részmunkaidős (part-time)</option>
                    <option value="internship">Gyakornoki (internship)</option>
                </Form.Select>
            </Form.Group>
            <Form.Group style={{marginTop: "20px"}}>
                <Form.Label>Település</Form.Label>
                <Form.Control type="text" value={props.search.city} onChange={props.onChange3}/>
            </Form.Group>
            <Form.Check style={{marginTop: "20px"}} id="home_office" value={!props.search.homeOffice} type="checkbox"
                        label="Home Office lehetőség" onChange={props.onChange4}/>
            <Row style={{textAlign: "center", marginTop: "20px"}}>
                <Col>
                    <Button variant="custom_primary" onClick={props.onClick}>Keresés</Button>
                </Col>
                <Col>
                    <Button variant="custom_danger" onClick={props.onClick1}>Szűrők törlése</Button>
                </Col>
            </Row>
        </Offcanvas.Body>
    </Offcanvas>;
}

FilterOffCanvas.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    search: PropTypes.shape({
        city: PropTypes.string,
        homeOffice: PropTypes.bool,
        company: PropTypes.string,
        type: PropTypes.string,
        salaryFrom: PropTypes.string,
        salaryTo: PropTypes.string
    }),
    onChange: PropTypes.func,
    onChange1: PropTypes.func,
    onChange2: PropTypes.func,
    onChange3: PropTypes.func,
    onChange4: PropTypes.func,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

export default FilterOffCanvas;