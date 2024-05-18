import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";

const Experiences = () => {
    const [numOfExperiences, setNumOfExperiences] = useState(1);

    return (
        <>
            <Form>
                {Array.from({length: numOfExperiences}, (_, i) => i).map((_, i) => {
                    return (
                        <>
                            <Container>
                                <Form.Group className="mb-3">
                                    <Form.Label>Munkahely</Form.Label>
                                    <Form.Control type="text" placeholder="Írd be a munkahely nevét" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pozíció</Form.Label>
                                    <Form.Control type="text" placeholder="Írd be a pozíciódat" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pozíció</Form.Label>
                                    <Form.Control type="text" placeholder="Írd be a pozíciódat" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mettől</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meddig</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                                <Button variant="secondary" type="button" >X</Button>
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