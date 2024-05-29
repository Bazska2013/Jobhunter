import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import Experiences from "../components/Experiences.jsx";
import NavBar from "../components/NavBar.jsx";
import {login} from "../features/auth/authorizedSlice.js";
import {show} from "../features/auth/loginModalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import * as formik from "formik";
import {getError, sendData, setEmail, setName, setPassword, setRole} from "../features/auth/registerSlice.js";
import {errorHide, errorShow, getModalError, setModalError} from "../features/auth/errorModalSlice.js";
import {unwrapResult} from "@reduxjs/toolkit";

const Register = () => {
    const [userType, setUserType] = useState(false);

    const { Formik } = formik;

    const schema = yup.object().shape({
        email: yup.string().email().required("Email cím megadása kötelező"),
        password1: yup.string().required("Jelszó megadása kötelező"),
        password2: yup.string().required("Jelszó ismételt megadása kötelező").oneOf([yup.ref('password1'), null], "A két jelszó nem egyezik"),
        name: yup.string().required("Név megadása kötelező"),
    });

    // const {email, password, name, role} = useSelector(state => state.register);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.register.error);

    const handleSubmit = async (values) => {
        try {
            dispatch(setName(values.name));
            dispatch(setEmail(values.email));
            dispatch(setPassword(values.password1));
            dispatch(setRole(userType ? 'company' : 'jobseeker'));
            await dispatch(sendData()).then(unwrapResult).then((result) => {
                if (result && result.payload === '') {
                    dispatch(login());
                    navigate('/');
                    dispatch(show());
                }
            }).catch((error) => {
                dispatch(errorShow());
            });
        } catch (error) {
            console.error("Error sending data: ", error);
        }
    }

    const errorModal = useSelector((state) => state.errorModal.value);

    return (
        <>
            <NavBar />
            <Modal show={errorModal} onHide={() => dispatch(errorHide())}>
                <Modal.Header>
                    <Modal.Title>Hiba</Modal.Title>
                    <Modal.Body>
                        {/*{console.log(error)}*/}
                        {error && error.payload}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => dispatch(errorHide())} >Bezárás</Button>
                    </Modal.Footer>
                </Modal.Header>
            </Modal>
            <Formik
                validationSchema={schema}
                onSubmit={values => {
                    handleSubmit(values);
                }}
                initialValues={{
                    email: '',
                    password1: '',
                    password2: '',
                    name: '',
                }}
            >
                {({handleSubmit, handleChange, values, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email cím</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Írd be az email címed"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Írd be a jelszavad"
                                name="password1"
                                value={values.password1}
                                onChange={handleChange}
                                isInvalid={!!errors.password1}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password1}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label>Jelszó megerősítése</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Írd be újra a jelszavad"
                                name="password2"
                                value={values.password2}
                                onChange={handleChange}
                                isInvalid={!!errors.password2}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password2}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="user-type">
                            <Form.Check type="radio" label="Munkavállaló vagyok" name="user-type" id="jobseeker" onClick={() => setUserType(false)} defaultChecked={true} />
                            <Form.Check type="radio" label="Munkáltató vagyok" name="user-type" id="company" onClick={() => setUserType(true)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name" >
                            {userType ?
                                <>
                                    <Form.Label>Cég neve</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Írd be regisztrálni kívánt cég nevét"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                </>
                                :
                                <>
                                    <Form.Label>Teljes neved</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Írd be a teljes neved"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                </>
                            }
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Regisztráció
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Register;