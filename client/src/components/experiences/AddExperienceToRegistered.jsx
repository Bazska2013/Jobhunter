import {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import plus from "../../assets/plus.svg";
import {useAddExperiencesMutation} from "../../features/jobs/experiencesApiSlice.js";

const AddExperienceToRegistered = (props) => {
    const [newExperience, setNewExperience] = useState(null);

    const [addExp] = useAddExperiencesMutation();

    const handleChangeExperience = (t, value) => {
        switch (t) {
            case "company":
                setNewExperience({...newExperience, company: value})
                break;
            case "title":
                setNewExperience({...newExperience, title: value})
                break;
            case "start":
                setNewExperience({...newExperience, interval: `${value}-${((newExperience.interval).split('-'))[1]}`});
                break;
            case "end":
                setNewExperience({...newExperience, interval: `${((newExperience.interval).split('-'))[0]}-${value}`});
                break;
        }
    }

    const handleCancel = () => {
        setNewExperience(null);
    }

    const handleSave = async () => {
        try {
            const result = await addExp({
                company: newExperience.company,
                title: newExperience.title,
                interval: newExperience.interval
            }).unwrap();
            // console.log(result);
            props.onMutation();
            props.onAdd({
                company: newExperience.company,
                title: newExperience.title,
                interval: newExperience.interval,
            })
            setNewExperience(null);
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <>
            {newExperience === null ? <>
                <Button
                    style={{backgroundImage:`url(${plus})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                    onClick={() => {
                    setNewExperience({
                                         company: '',
                                         title: '',
                                         interval: '-',
                                     })
                }} variant="outline-secondary"></Button>
            </> : <>
                <InputGroup>
                    <InputGroup.Text >Cég neve</InputGroup.Text>
                    <Form.Control
                        onChange={(e) => {handleChangeExperience('company', e.target.value)}}
                        value={newExperience.company} />
                    <InputGroup.Text>Pozíció</InputGroup.Text>
                    <Form.Control
                        onChange={(e) => {handleChangeExperience('title', e.target.value)}}
                        value={newExperience.title} />
                    <InputGroup.Text>Kezdés éve</InputGroup.Text>
                    <Form.Control
                        onChange={(e) => {handleChangeExperience('start', e.target.value)}}
                        value={((newExperience.interval).split('-'))[0]} />
                    <InputGroup.Text>Befejezés éve</InputGroup.Text>
                    <Form.Control
                        onChange={(e) => {handleChangeExperience('end', e.target.value)}}
                        value={((newExperience.interval).split('-'))[1]} />
                    <Button
                        onClick={() => {handleSave()}}
                        variant="outline-success" style={{backgroundImage:`url(${check})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                    ></Button>
                    <Button
                        onClick={() => {handleCancel()}}
                        variant="outline-danger" style={{backgroundImage:`url(${close})`,backgroundSize:"cover", width:"40px", height:"40px"}}
                    ></Button>
                </InputGroup>
            </>}
        </>
    )
}

export default AddExperienceToRegistered;