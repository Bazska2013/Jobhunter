import {Button, Container, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar.jsx";
import React, {useState} from "react";
import { useLoginMutation } from "../features/auth/authApiSlice.js";
import {Formik} from "formik";
import * as yup from "yup";
import {login} from "../features/auth/authSlice.js";
import ErrorModal from "../components/modals/ErrorModal.jsx";
import {setSuccessMessage, show} from "../features/modals/showModalSlice.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authLogin] = useLoginMutation();
    // const [values, setValues] = useState({});
    const [errors, setErrors] = useState('');

    const schema = yup.object().shape({
        email: yup.string().email("Helytelen formátum").required("Email cím megadása kötelező"),
        password: yup.string().required("Jelszó megadása kötelező"),
    });

    const handleSubmit = async (values) => {
        // event.preventDefault();
        try {
            const result = await authLogin({
                email: values.email,
                password: values.password,
                strategy: 'local',
            }).unwrap();
            dispatch(login(result));
            dispatch(setSuccessMessage("Sikeres bejelentkezés"));
            dispatch(show())
            navigate('/', {replace: true});
        } catch (error) {
            console.error(error);
            setErrors(error.status.toString());
        }

    }

    return (
        <>
            <ErrorModal error={errors} onClose={() => setErrors('')} />
            <Container style={{border: "#f8c124 1px solid", marginBottom: "20px", borderRadius: "10px", boxShadow: "#ddac25 0 0 10px"}}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={ values => {
                        handleSubmit(values);
                    }}
                >
                    {({handleSubmit, handleChange, values, errors}) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group style={{marginTop: "10px"}} className="mb-3" controlId="email">
                                <Form.Label>Email cím</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@example.com"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group style={{marginTop: "10px"}} className="mb-3" controlId="password">
                                <Form.Label>Jelszó</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button style={{marginTop: "10px"}} variant="custom_primary" type="submit">
                                Bejelentkezés
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    );
}

export default Login;