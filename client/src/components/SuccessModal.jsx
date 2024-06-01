import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {hide} from "../features/modals/showModalSlice.js";

const SuccessModal = (props) => {
    const dispatch = useDispatch();
    let show = useSelector(state => state.showModal.show);
    let message = useSelector(state => state.showModal.message);
    return (
        <Modal show={show} onHide={() => {dispatch(hide())}}>
            <Modal.Header closeButton>
                <Modal.Title>Sikeres művelet</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {dispatch(hide())}}>
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;