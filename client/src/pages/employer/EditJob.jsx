import {Button, Form, InputGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useCreateJobMutation, useOneJobQuery, useModifyJobMutation} from "../../features/jobs/jobsApiSlice.js";
import * as yup from 'yup';
import {Formik} from "formik";

const EditJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createJob] = useCreateJobMutation();
    const [modifyJob] = useModifyJobMutation();
    let { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        company: '',
        position: '',
        description: '',
        salaryFrom: '',
        salaryTo: '',
        type: '',
        city: '',
        homeOffice: false,
    });

    const { data, isLoading, isError } = useOneJobQuery(id);

    useEffect(() => {
        if (id && !isLoading && !isError) {
            const job = data;
            setInitialValues({
                company: job.company,
                position: job.position,
                description: job.description,
                salaryFrom: job.salaryFrom,
                salaryTo: job.salaryTo,
                type: job.type,
                city: job.city,
                homeOffice: job.homeOffice,
            });
        }
    }, [id, data, isLoading, isError]);

    const schema = yup.object().shape({
        company: yup.string().required("Cég nevének megadása kötelező"),
        position: yup.string().required("Pozíció megadása kötelező"),
        description: yup.string().required("Leírás megadása kötelező"),
        salaryFrom: yup.number().min(0, "Nem lehet negatív érték").required("Fizetés megadása kötelező"),
        salaryTo: yup.number().min(yup.ref('salaryFrom'), 'Nem lehet kissebb a minimum értéknél').required("Fizetés megadása kötelező"),
        type: yup.string().required("Foglalkoztatás formájának megadása kötelező"),
        city: yup.string().required("Település megadása kötelező"),
        homeOffice: yup.boolean(),
    });

    const handleSubmit = async (values) => {
        if (id) {
            try {
                const result = await modifyJob(id, {
                company: values.company,
                position: values.position,
                description: values.description,
                salaryFrom: values.salaryFrom,
                salaryTo: values.salaryTo,
                type: values.type,
                city: values.city,
                homeOffice: values.homeOffice,
                }).unwrap();
                console.log(result);
            } catch (error) {
                console.log("error: ", error);
            }
        } else {
            try {
                const result = await createJob({
                    company: values.company,
                    position: values.position,
                    description: values.description,
                    salaryFrom: values.salaryFrom,
                    salaryTo: values.salaryTo,
                    type: values.type,
                    city: values.city,
                    homeOffice: values.homeOffice,
                }).unwrap();
                // navigate(`/job/${result.id}`, {replace: true});
                console.log("result: ", result);
            } catch (error) {
                console.log("error: ", error);
            }
        }
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={ values => {
                    handleSubmit(values);
                }}
            >
                {({handleSubmit, handleChange, values, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="company">
                            <Form.Label>Cég neve</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Halo Haven Kft."
                                name="company"
                                value={values.company}
                                onChange={handleChange}
                                isInvalid={!!errors.company}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.company}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="position">
                            <Form.Label>Pozíció</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Sales Assistant"
                                name="position"
                                value={values.position}
                                onChange={handleChange}
                                isInvalid={!!errors.position}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.position}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Leírás</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Fizetési sáv</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="tól"
                                name="salaryFrom"
                                value={values.salaryFrom}
                                onChange={handleChange}
                                isInvalid={!!errors.salaryFrom}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.salaryFrom}
                            </Form.Control.Feedback>
                            <Form.Control
                                type="number"
                                placeholder="ig"
                                name="salaryTo"
                                value={values.salaryTo}
                                onChange={handleChange}
                                isInvalid={!!errors.salaryTo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.salaryTo}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Select aria-label="Foglalkoztatás formája"
                                     name="type"
                                     value={values.type}
                                     onChange={handleChange}
                                     isInvalid={!!errors.type}
                        >
                            <option>Foglalkoztatás formája</option>
                            <option value="full-time">Teljes állás (full-time)</option>
                            <option value="part-time">Részmunkaidős (part-time)</option>
                            <option value="internship">Gyakornoki (internship)</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.type}
                        </Form.Control.Feedback>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Település</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Budapest"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Check
                            id="homeOffice"
                            name="homeOffice"
                            type="checkbox"
                            label="Home Office"
                            value={values.homeOffice}
                            onChange={handleChange}
                        />
                        <Button variant="primary" type="submit">
                            Létrehozás
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditJob;