import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {login} from "../features/auth/authorizedSlice.js";
import NavBar from "../components/NavBar.jsx";
import React from "react";
import {show} from "../features/auth/loginModalSlice.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login());
        navigate('/');
        dispatch(show());
    }

    return (
        <>
            <NavBar />
            <Form onSubmit={handleSubmit}>
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