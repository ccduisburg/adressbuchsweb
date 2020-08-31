import * as React from 'react'
import { RouteComponentProps, match } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Person, Geschlescht } from '../types/Person';
import * as TimeUtils from "../util/TimeUtil"
import { getContacts, getContact } from './services/Requests';
import { Container, Row, Card, Col, FormGroup, FormLabel, FormControl, FormControlProps, Accordion, Button, Navbar, Form } from 'react-bootstrap';


interface Props extends RouteComponentProps<PathVariables> { }

interface PathVariables {
    id: string;
}

const Details: React.SFC<Props> = ({ match }) => {

    const [person, setPerson] = useState<Person>({
        id: 0,
        titel: "",
        name: "",
        vorname: "",
        email: "",
        geschlecht: Geschlescht.MÄNNLICH,
        geburstdatum: new Date(""),
        anschrift: ""

    })
    const getPerson = async () => {
        let r = await getContact(Number(match.params.id));
        console.log(r);
        setPerson(r.data);
    }
    console.log("match.params.id")
    useEffect(() => {
        getPerson();
    }, [match.params.id]);

    return (
        <div className="h-90">
            <div className="h-90  align-items-center justify-content">
                <Container fluid={true}>
                    <Card.Header>
                        Persondetails
                </Card.Header>
                    <Navbar className="bg-light justify-content-between">
                        <Row>
                            <Col>
                                <FormGroup controlId="id">
                                    <FormLabel className="">id </FormLabel>
                                    <FormControl
                                        type="text"
                                        name="id"
                                        className="form-control"
                                        value={person.id}
                                        disabled={true}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Navbar>
                    <Row>
                        <Col>
                            <FormGroup >
                                <FormLabel>Titel</FormLabel>
                                <FormControl
                                    type="text"
                                    name="titel"
                                    className="form-control"
                                    value={person.titel}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup >
                                <FormLabel>Vorname</FormLabel>
                                <FormControl
                                    type="text"
                                    name="vorname"
                                    className="form-control"
                                    value={person.vorname}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup >
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={person.name}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>

                    </Row>

                    <Row>

                        <Col>
                            <FormGroup >
                                <FormLabel>Geschlecht</FormLabel>
                                <FormControl
                                    type="text"
                                    name="geschlecht"
                                    className="form-control"
                                    value={person.geschlecht}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup >
                                <FormLabel>Geburstdatum</FormLabel>
                                <FormControl
                                    type="text"
                                    name="geburstdatum"
                                    className="form-control"
                                    value={TimeUtils.convertAndFormatTimestamp(String(person.geburstdatum))}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>

                        <Col>
                            <FormGroup >
                                <FormLabel>E-mail</FormLabel>
                                <FormControl
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={person.email}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>


                    </Row>
                    <Row>

                        <Col>
                            <FormGroup >
                                <FormLabel>Anschrift</FormLabel>
                                <FormControl
                                    type="text"
                                    name="anschrift"
                                    className="form-control"
                                    value={person.anschrift}
                                    disabled={true}

                                />
                            </FormGroup>
                        </Col>


                    </Row>
                    {/*            
                <button onClick={() => history.goBack()}>Go Back</button> */}
                </Container>
            </div>
        </div>

    )

}
export default Details;