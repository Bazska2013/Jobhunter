import {useDispatch, useSelector} from "react-redux";
import {InputGroup, Modal, Form, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {hideModifyExperiences} from "../../features/modals/showModifyExperiencesModalSlice.js";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import close_red from "../../assets/close_red.svg";

const ModifyExperiencesModal = (props) => {
    const dispatch = useDispatch();
    let show = useSelector(state => state.showModifyExperiencesModal.show);
    let data = useSelector(state => state.showModifyExperiencesModal.data);
    console.log(data)
    const [modified, setModified] = useState(false);
    const [experiences, setExperiences] = useState(data.data);
    console.log(experiences)
    const [experience, setExperience] = useState({});
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setExperiences(data.data);
    }, [data.data]);

    const handleModify = (index) => {
        setSelected(index);
        setExperience(experiences[index]);
        setModified(true);
    }

    const handleDisable = (index) => {
        return index === selected;

    }

    return (
        <Modal size="xl" centered show={show} onHide={() => {dispatch(hideModifyExperiences())}}>
            <Modal.Header closeButton>
                <Modal.Title>Tapasztalatok szerkesztése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Array.isArray(experiences) && experiences.map((exp, index) => (
                    <InputGroup key={index}>
                        <InputGroup.Text onChange={() => {handleModify(index)}}>Cég neve</InputGroup.Text>
                        <Form.Control disabled={handleDisable(index)} value={exp.company} />
                        <InputGroup.Text>Pozíció</InputGroup.Text>
                        <Form.Control disabled={handleDisable(index)} value={exp.title} />
                        {/*<InputGroup.Text>Kezdés éve</InputGroup.Text>*/}
                        {/*<Form.Control value={exp.startYear} />*/}
                        {/*<InputGroup.Text>Befejezés éve</InputGroup.Text>*/}
                        {/*<Form.Control value={exp.endYear} />*/}
                        {modified ? <>
                            <Button disabled={handleDisable(index)} onClick={() => {setModified(false)}} variant="outline-success" style={{backgroundImage:`url(${check})`,backgroundSize:"cover", width:"40px", height:"40px"}}></Button>
                            <Button disabled={handleDisable(index)} onClick={() => {setModified(false)}} variant="outline-danger" style={{backgroundImage:`url(${close})`,backgroundSize:"cover", width:"40px", height:"40px"}}></Button>
                        </> : <Button variant="outline-danger" style={{backgroundImage:`url(${close_red})`,backgroundSize:"cover", width:"40px", height:"40px"}}></Button>
                        }
                    </InputGroup>

                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {dispatch(hideModifyExperiences())}}>
                    Bezárás
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModifyExperiencesModal;