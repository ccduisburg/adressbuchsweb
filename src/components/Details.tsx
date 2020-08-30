import * as React from 'react'
import { RouteComponentProps, match } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Person, Geschlescht } from '../types/Person';
import * as TimeUtils from "../util/TimeUtil"
import { getContacts, getContact } from './services/Requests';
import { Container, Row, Card, Col, FormGroup, FormLabel, FormControl, FormControlProps, Accordion, Button, Navbar, Form } from 'react-bootstrap';
export interface DetailsProps extends RouteComponentProps<{ id: string; }> { }

interface Props extends RouteComponentProps {
    match: match<PathVariables>;
}
interface PathVariables {
    id: string;
}

const Details: React.SFC<Props> = ({ history, match }) => {
    const [vorname, setVorname] = useState<string | any>();
    const [nachname, setNachname] = useState<string | any>();
    const [geburtsdatum, setGeburtsdatum] = useState<string | any>();
    const [email, setEmail] = useState<string | any>();
    const [geschlecht, setGeschlescht] = useState<Geschlescht | any>();
    const [adresse, setAdresse] = useState<string | any>();
    const [person, setPerson] = useState<Person>({
        id: 0,
        titel: "",
        name: "",
        vorname: "",
        email: "",
        geschlecht:Geschlescht.MÄNNLICH,
        geburstdatum: new Date(""),
        adresse: ""

    })
    const getPerson = async () => {
        let r = (await getContact(Number(match.params.id))).data;
        console.log(r);
        setPerson(r);
    }

    useEffect(() => {
        getPerson();
    }, []);

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
                            <FormLabel>titel</FormLabel>
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
                            <FormLabel>vorname</FormLabel>
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
                            <FormLabel>name</FormLabel>
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
                            <FormLabel>geschlecht</FormLabel>
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
                            <FormLabel>geburstdatum</FormLabel>
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
                            <FormLabel>email</FormLabel>
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
                            <FormLabel>adresse</FormLabel>
                            <FormControl
                                type="text"
                                name="adresse"
                                className="form-control"
                                value={person.adresse}
                                disabled={true}

                            />
                        </FormGroup>
                    </Col>


                </Row>
           
                <button onClick={() => history.goBack()}>Go Back</button>
            </Container>
  </div>
  </div>

    )

}
export default Details;