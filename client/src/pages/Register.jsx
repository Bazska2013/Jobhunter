import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import Experiences from "../components/Experiences.jsx";
import NavBar from "../components/NavBar.jsx";
import {login} from "../features/auth/authorizedSlice.js";
import {show} from "../features/auth/loginModalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import * as formik from "formik";

const Register = () => {
    const [userType, setUserType] = useState(false);

    const { Formik } = formik;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password1: yup.string().required(),
        password2: yup.string().required(),
        name: yup.string().required(),
    });

    // const { email, password, fullname, role } = useSelector(state => state.register);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const user = { email, password, fullname, role };
    //     try {
    //         schema.validate(user);
    //         dispatch(register(user));
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     dispatch(login());
    //     navigate('/');
    //     dispatch(show());
    // }

    return (
        <>
            <NavBar />
            <Formik
                validationSchema={schema}
                onSubmit={console.log}
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