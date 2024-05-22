import {Form, InputGroup} from "react-bootstrap";

const EditJob = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Cég neve</Form.Label>
                    <Form.Control type="text" placeholder="Halo Haven Kft." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pozíció</Form.Label>
                    <Form.Control type="text" placeholder="Sales Assistant" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Leírás</Form.Label>
                    <Form.Control as="textarea" />
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Fizetési sáv</InputGroup.Text>
                    <Form.Control type="number" placeholder="tól" />
                    <Form.Control type="number" placeholder="ig" />
                </InputGroup>
                <Form.Select aria-label="Foglalkoztatás formája">
                    <option>Foglalkoztatás formája</option>
                    <option value="1">Teljes állás (full-time)</option>
                    <option value="2">Részmunkaidős (part-time)</option>
                    <option value="3">Gyakornoki (internship)</option>
                </Form.Select>
                <Form.Group className="mb-3">
                    <Form.Label>Település</Form.Label>
                    <Form.Control type="text" placeholder="Budapest" />
                </Form.Group>
                <Form.Check id="home_office" type="checkbox" label="Home Office" />
            </Form>
        </div>
    )
}

export default EditJob;