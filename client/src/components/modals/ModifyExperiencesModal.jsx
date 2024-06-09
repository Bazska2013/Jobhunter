import {useDispatch, useSelector} from "react-redux";
import {Modal, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {hideModifyExperiences} from "../../features/modals/showModifyExperiencesModalSlice.js";
import ModifyExperience from "../experiences/ModifyExperience.jsx";
import AddExperienceToRegistered from "../experiences/AddExperienceToRegistered.jsx";
import PropTypes from "prop-types";

const ModifyExperiencesModal = (props) => {
    const dispatch = useDispatch();
    let show = useSelector(state => state.showModifyExperiencesModal.show);
    let data = useSelector(state => state.showModifyExperiencesModal.data);
    const [experiences, setExperiences] = useState(data);

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
        <Modal size="xl" scrollable centered show={show} onHide={() => {dispatch(hideModifyExperiences())}}>
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

ModifyExperiencesModal.propTypes = {
    onMutation: PropTypes.func.isRequired
};

export default ModifyExperiencesModal;