import React from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import NavBar from "../../components/NavBar.jsx";

export const Profile = () => {
    return (
        <div>
            <h1>Profilom</h1>
            <Container>
                <Row>
                    <Col>
                        <h2>Személyes adatok</h2>
                        <p>Adataid és tapasztalataid egy helyen</p>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button>Tapasztalatok szerkesztése</Button>
                    </Col>
                </Row>
                <Table striped responsive>
                    <tbody>
                        <tr>
                            <td>
                                Név
                            </td>
                            <td colSpan={2}>
                                Margot Foster
                            </td>
                        </tr>
                        <tr>
                            <td>
                                E-mail
                            </td>
                            <td colSpan={2}>
                                user1@jobhunter.hu
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Státusz
                            </td>
                            <td colSpan={2}>
                                Munkakereső
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={3}>
                                Korábbi tapasztalatok
                            </th>
                        </tr>
                        <tr>
                            <td>Anonymus Kft.</td>
                            <td>2020-2024</td>
                            <td>Full Time Back end Developer</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}