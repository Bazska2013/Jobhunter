import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import Experiences from "../components/Experiences.jsx";
import NavBar from "../components/NavBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useRegisterMutation} from "../features/auth/authApiSlice.js";
import {login} from "../features/auth/authSlice.js";
import {Formik} from "formik";
import ErrorModal from "../components/ErrorModal.jsx";
import {setSuccessMessage, show} from "../features/modals/showModalSlice.js";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(false);
    const [authRegister] = useRegisterMutation();
    const [errors, setErrors] = useState('');

    const schema = yup.object().shape({
        email: yup.string().email("Helytelen formátum").required("Email cím megadása kötelező"),
        password1: yup.string().required("Jelszó megadása kötelező"),
        password2: yup.string().required("Jelszó ismételt megadása kötelező").oneOf([yup.ref('password1'), null], "A két jelszó nem egyezik"),
        name: yup.string().required("Név megadása kötelező"),
    });

    const handleSubmit = async (values) => {
        try {
            const result = await authRegister({
                email: values.email,
                password: values.password1,
                fullname: values.name,
                role: userType ? 'company' : 'jobseeker',
            }).unwrap();
            dispatch(login({
                email: result.email,
                password: result.password,
                strategy: 'local',
            }));
            dispatch(setSuccessMessage("Sikeres regisztráció"));
            dispatch(show())
            navigate('/login', {replace: true});
        } catch (error) {
            console.log("error: ", error);
            setErrors(error.status.toString());
        }
    }

    return (
        <>
            <ErrorModal error={errors} onClose={() => setErrors('')} />
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
                                placeholder="example@example.com"
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
                                        placeholder="Jobhunter Kft."
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
                                        placeholder="John Doe"
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