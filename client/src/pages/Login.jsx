import {Button, Form} from "react-bootstrap";

const Login = () => {
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" placeholder="Írd be az email címed" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Írd be a jelszavad" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Bejelentkezés
                </Button>
            </Form>
        </>
    );
}

export default Login;