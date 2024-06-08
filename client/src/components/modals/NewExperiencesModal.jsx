import {Button, Modal, Row, Form, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideNewExperiences, setExperienceData} from "../../features/modals/showNewExperiencesModalSlice.js";
import {useEffect, useState} from "react";

const NewExperiencesModal = (props) => {
    const dispatch = useDispatch();
    let show =useSelector(state => state.showNewExperiencesModal.show);
    let data = useSelector(state => state.showNewExperiencesModal.data);
    const [experiencesJSON, setExperiencesJSON] = useState('');

    useEffect(() => {
        if (data) {
            setExperiencesJSON(data.map(exp => `${exp.company};${exp.title};${exp.interval}`).join('\n'));
        } else {
            setExperiencesJSON('');
        }
    }, [data]);

    const handleSave = () => {
        const experiences = experiencesJSON.split('\n');
        const exps = [];
        for (let i = 0; i < experiences.length; i++) {
            const exp = experiences[i].split(';');
            exps.push({
                company: exp[0],
                title: exp[1],
                interval: exp[2]
            });
        }
        dispatch(setExperienceData(exps));
        dispatch(hideNewExperiences());
    }

    return (
        <Modal size="lg" centered show={show} onHide={() => dispatch(hideNewExperiences())}>
            <Modal.Header closeButton>
                <Modal.Title>Tapasztalatok felvétele</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <h3>Az alábbi több-soros szöveges beviteli mezőben megadhatóak a korábbi munkatapasztalatok a következő módon:</h3>
                </Row>
                <Row>
                    <p>Soronként tördelve egy-egy munkatapasztalatot tudunk megadni.</p>
                </Row>
                <Row>
                    <p>";" jellel elválasztva adhatjuk meg ebben a sorrendben a tapasztalat adatait:</p>
                </Row>
                <Row>
                    <p>- Cég neve</p>
                    <p>- Pozíció</p>
                    <p>- Kezdő évszám-Befejezés évszáma(Ha jelenleg is itt dolgozik üresen hagyhatja)</p>
                </Row>
                <Row>
                    <Form.Control
                        as="textarea"
                        placeholder={'Halo Haven;Front-end fejlesztő;2021-2022\n' +
                            'Dunder Mifflin;Full-stack fejlesztő;2022-'}
                        rows={5}
                        value={experiencesJSON}
                        onChange={(e) => setExperiencesJSON(e.target.value)}
                    />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {handleSave()}}
                >Mentés</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewExperiencesModal;