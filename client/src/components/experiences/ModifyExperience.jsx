import {Button, Form, InputGroup} from "react-bootstrap";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import edit from "../../assets/edit.svg";
import close_red from "../../assets/close_red.svg";
import {useState} from "react";
import {useDeleteExperienceMutation, useModifyExperienceMutation} from "../../features/jobs/experiencesApiSlice.js";

const ModifyExperience = (props) => {
    const [selected, setSelected] = useState(false);
    const [experience, setExperience] = useState(props.exp);

    const [modify] = useModifyExperienceMutation();
    const [deleteExp] = useDeleteExperienceMutation();

    const handleChangeExperience = (t, value) => {
        switch (t) {
            case "company":
                setExperience({...experience, company: value})
                break;
            case "title":
                setExperience({...experience, title: value})
                break;
            case "start":
                setExperience({...experience, interval: `${value}-${((experience.interval).split('-'))[1]}`});
                break;
            case "end":
                setExperience({...experience, interval: `${((experience.interval).split('-'))[0]}-${value}`});
                break;
        }
    }
    const handleCancel = () => {
        setExperience(props.exp);
        setSelected(false);
    }

    const handleSave = async () => {
        try {
            const result = await modify({
                body: {
                    company: experience.company,
                    title: experience.title,
                    interval: experience.interval
                },
                id: experience.id
            }).unwrap();
            // console.log(result);
            setSelected(false);
            props.onMutation();
        } catch (error) {
            console.error(error);
            setExperience(props.exp);
        }
    }

    const handleDelete = async () => {
        try {
            const result = await deleteExp(experience.id).unwrap();
            // console.log(result);
            props.onMutation();
            props.onDelete(experience.id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <InputGroup>
            <InputGroup.Text >Cég neve</InputGroup.Text>
            <Form.Control
                onChange={(e) => {handleChangeExperience('company', e.target.value)}}
                disabled={!selected}
                value={experience.company} />
            <InputGroup.Text>Pozíció</InputGroup.Text>
            <Form.Control
                onChange={(e) => {handleChangeExperience('title', e.target.value)}}
                disabled={!selected}
                value={experience.title} />
            <InputGroup.Text>Kezdés éve</InputGroup.Text>
            <Form.Control
                onChange={(e) => {handleChangeExperience('start', e.target.value)}}
                disabled={!selected}
                value={((experience.interval).split('-'))[0]} />
            <InputGroup.Text>Befejezés éve</InputGroup.Text>
            <Form.Control
                onChange={(e) => {handleChangeExperience('end', e.target.value)}}
                disabled={!selected}
                value={((experience.interval).split('-'))[1]} />
            {selected ? <>
                <Button
                    onClick={() => {handleSave()}}
                    variant="outline-success" style={{backgroundImage:`url(${check})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                ></Button>
                <Button
                    onClick={() => {handleCancel()}}
                    variant="outline-danger" style={{backgroundImage:`url(${close})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                ></Button>
            </> : <>
                <Button
                    onClick={() => {setSelected(true)}}
                    variant="outline-success" style={{backgroundImage:`url(${edit})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                ></Button>
                <Button
                    onClick={() => {handleDelete()}}
                    variant="outline-danger" style={{backgroundImage:`url(${close_red})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                ></Button>
            </>
            }
        </InputGroup>
    )
}

export default ModifyExperience;