import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";

const Experiences = () => {
    const [numOfExperiences, setNumOfExperiences] = useState(1);

    return (
        <>
            <Form>
                <p>Hozzáadhatsz a profilodhoz korábbi munkatapasztalatokat</p>
                {Array.from({length: numOfExperiences}, (_, i) => i).map((_, i) => {
                    return (
                        <>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Munkahely</Form.Label>
                                            <Form.Control type="text" placeholder="Írd be a munkahely nevét" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Pozíció</Form.Label>
                                            <Form.Control type="text" placeholder="Írd be a pozíciódat" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Mettől</Form.Label>
                                            <Form.Control type="number" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Meddig</Form.Label>
                                            <Form.Control type="number" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" type="button" >Munkatapasztalat törlése</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    )
                })}
                <Button variant="secondary" type="button" onClick={() => setNumOfExperiences((numOfExperiences) + 1)}>Másik tapasztalat hozzáadása</Button>
                <Button variant="primary" type="submit">Mentés</Button>
            </Form>
        </>
    );
}

export default Experiences;