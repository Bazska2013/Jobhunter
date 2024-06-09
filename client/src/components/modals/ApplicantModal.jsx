import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {hideApplicant} from "../../features/modals/showApplicantModalSlice.js";

const ApplicantModal = () => {
    const dispatch = useDispatch();
    let show = useSelector(state => state.showApplicantModal.show);
    let data = useSelector(state => state.showApplicantModal.data);
    return (
        <Modal size="lg" centered show={show} onHide={() => {dispatch(hideApplicant())}}>
            <Modal.Header closeButton>
                <Modal.Title>Jelentkező adatai</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Név</Col>
                    <Col>E-mail</Col>
                </Row>
                <Row>
                    <Col>{data.user ? data.user.fullname : 'Loading...'}</Col>
                    <Col>{data.user ? data.user.email : 'Loading...'}</Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="custom_secondary" onClick={() => {dispatch(hideApplicant())}}>
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplicantModal;