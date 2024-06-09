import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const ErrorModal = (props) => {
    const { error, onClose } = props;
    const showError = Boolean(error);
    const status = typeof error === 'object' ? JSON.stringify(error) : error;
    let errorMessage = '';
    if (status === '401') {
        errorMessage = 'Hibás email cím vagy jelszó';
    } else if (status === '500') {
        errorMessage = 'Ezzel az e-mail címmel már regisztráltak';
    } else {
        errorMessage = 'Ismeretlen hiba történt';
    }

    return (
        <Modal show={showError} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hiba</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="custom_secondary" onClick={onClose}>
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ErrorModal.propTypes = {
error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClose: PropTypes.func.isRequired,
};

export default ErrorModal;