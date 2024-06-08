import {useDispatch, useSelector} from "react-redux";
import {InputGroup, Modal, Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {hideModifyExperiences} from "../../features/modals/showModifyExperiencesModalSlice.js";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import close_red from "../../assets/close_red.svg";
import edit from "../../assets/edit.svg";
import ModifyExperience from "../experiences/ModifyExperience.jsx";
import AddExperienceToRegistered from "../experiences/AddExperienceToRegistered.jsx";

const ModifyExperiencesModal = (props) => {
    const dispatch = useDispatch();
    let show = useSelector(state => state.showModifyExperiencesModal.show);
    let data = useSelector(state => state.showModifyExperiencesModal.data);
    const [modified, setModified] = useState(false);
    const [experiences, setExperiences] = useState(data);
    const [experience, setExperience] = useState({});
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (Array.isArray(data)) {
            setExperiences(data);
        } else {
            setExperiences([]);
        }
    }, [data]);

    useEffect(() => {
        setExperiences(prevExperiences => [...prevExperiences]);
    }, [props.onMutation]);

    const handleDelete = (id) => {
        setExperiences(prevExperiences => prevExperiences.filter(exp => exp.id !== id));
    }

    const handleAdd = (exp) => {
        setExperiences(prevExperiences => [...prevExperiences, exp]);
    }

    return (
        <Modal size="xl" centered show={show} onHide={() => {dispatch(hideModifyExperiences())}}>
            <Modal.Header closeButton>
                <Modal.Title>Tapasztalatok szerkesztése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Array.isArray(experiences) && experiences.map((exp, index) => (
                    <ModifyExperience key={index} exp={exp} onDelete={handleDelete} onMutation={props.onMutation} />
                ))}
                <AddExperienceToRegistered onMutation={props.onMutation} onAdd={handleAdd} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="custom_secondary" onClick={() => {dispatch(hideModifyExperiences())}}>
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModifyExperiencesModal;