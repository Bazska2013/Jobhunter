import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import Experiences from "../components/Experiences.jsx";
import NavBar from "../components/NavBar.jsx";
import {login} from "../features/auth/authorizedSlice.js";
import {show} from "../features/auth/loginModalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    fullname: yup.string().required(),
    role: yup.string().oneOf(['company', 'employee']).required(),
});

const Register = () => {
    const [userType, setUserType] = useState(false);

    const { email, password, fullname, role } = useSelector(state => state.register);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { email, password, fullname, role };
        try {
            schema.validate(user);
            dispatch(register(user));
        } catch (error) {
            console.error(error);
        }
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó megerősítése</Form.Label>
                    <Form.Control type="password" placeholder="Írd be újra a jelszavad" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="radio" label="Munkavállaló vagyok" name="user-type" id="jobseeker" onClick={() => setUserType(false)} defaultChecked={true} />
                    <Form.Check type="radio" label="Munkáltató vagyok" name="user-type" id="company" onClick={() => setUserType(true)} />
                </Form.Group>
                <Form.Group>
                    {userType ?
                        <>
                            <Form.Label>Cég neve</Form.Label>
                            <Form.Control type="text" placeholder="Írd be regisztrálni kívánt cég nevét" />
                        </>
                        :
                        <>
                            <Form.Label>Teljes neved</Form.Label>
                            <Form.Control type="text" placeholder="Írd be a teljes neved" />
                        </>
                    }
                </Form.Group>
                {userType ? <></> :
                <>
                    <Experiences />
                </>
                }
                <Button variant="primary" type="submit">
                    Regisztráció
                </Button>
            </Form>
        </>
    );
}

export default Register;