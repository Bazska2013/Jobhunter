import {Row, Spinner} from "react-bootstrap";

const LoaderAnimation = () => {
    return <Row className="justify-content-center">
        <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Adatok betöltése...</span>
        </Spinner>
    </Row>;
}

export default LoaderAnimation;