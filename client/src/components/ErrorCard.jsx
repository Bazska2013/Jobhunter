import {Button, Card} from "react-bootstrap";
import * as PropTypes from "prop-types";

const ErrorCard = (props) => {
    return <Card style={{marginBottom: "20px"}}>
        <Card.Body>
            <Card.Title>Hiba</Card.Title>
            <Card.Text>Hiba történt az adatok betöltése során. Kattintson az Újrapróbálkozás gombra az adatok újbóli
                lekéréséhez.</Card.Text>
            <Button variant="custom_primary" onClick={props.onClick}>Újrapróbálkozás</Button>
        </Card.Body>
    </Card>;
}
ErrorCard.propTypes = {onClick: PropTypes.func};

export default ErrorCard;