import InlineSvg from 'react-inlinesvg';
import NotFoundImg from '../assets/404.svg';
import {Button, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const NoMatch = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Row>
                <InlineSvg style={{width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src={NotFoundImg} />
            </Row>
            <Row>
                <Button variant="outline-secondary" onClick={() => {navigate('/', {replace: 'true'})}}>Visszatérés a főoldalra</Button>
            </Row>
        </div>
    );
}

export default NoMatch;