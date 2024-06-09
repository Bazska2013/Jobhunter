import {Row, Spinner} from "react-bootstrap";
import React from "react";

const LoaderAnimation = () => {
    return <Row className="justify-content-center">
        <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Adatok betöltése...</span>
        </Spinner>
    </Row>;
}

export default LoaderAnimation;