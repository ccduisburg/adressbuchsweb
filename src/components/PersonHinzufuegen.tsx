import * as React from 'react';
import { Alert, Button, Form, Nav, FormControlProps, InputGroup, Row, FormControl, Col, Container } from 'react-bootstrap';
import { DataTableColumn } from './DataTable/types';
import * as TimeUtils from '../util/TimeUtil';
import DataTable from './DataTable/DataTable';
import TableEditorText from './DataTable/Text';
import { Person, Geschlescht } from '../types/Person';
import { deleteContact, getContacts, addContact, getPersonbyname, getPersonbyemail } from './services/Requests';
import { error, Console } from 'console';


import { useState, useRef } from 'react';
import { convertAndFormatTimestamp } from '../util/TimeUtil';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export interface AdressbuchProps { }

const PersonHinzufuegen: React.SFC<AdressbuchProps> = (props) => {
    const [nameFilter, setNameFilter] = useState<string | null>("");
    const [emailFilter, setEmailFilter] = useState<string | null>('');
    const [vorname, setVorname] = useState<string | any>();
    const [name, setName] = useState<string | any>();
    const [geburstdatum, setGeburstdatum] = useState<string | any>();
    type FormContr = React.FormEvent<FormControlProps>;
    const [nocookie] = useState<boolean>(false);
    const [email, setEmail] = useState<string|any>();
    const [geschlecht, setGeschlecht] = useState<string | any>();
    const [titel, setTitel] = useState<string | any>();
    const [adresse, setAdresse] = useState<string | any>();
    const [personal, setPersonal] = useState<Person[]>([]);
    const [error, setError] = useState<string | null | undefined>('');
    const inputAktionIdRef = useRef<FormContr & HTMLInputElement>(null);
    const inputAktionTextRef = useRef<FormContr & HTMLInputElement>(null);
    const saveButtonRef = useRef<Button & HTMLButtonElement>(null);
    const [showAlertError, setShowAlertError] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const [person, setPerson] = useState<Person>({
        id: 0,
        titel: titel,
        name: name,
        vorname: vorname,
        email: email,
        geschlecht: geschlecht,
        geburstdatum: geburstdatum,
        adresse: adresse

    })


    const getAdressbuch = async () => {
        let r = (await getContacts()).data
        setPersonal(r);
    }
    React.useEffect(() => {
        if (titel != "" && vorname !== "" && name !== "" && geburstdatum !== "" && email !== "" && adresse !== "" && String(email).includes('@')) {
            setValid(true);
        }

    }, [titel, name, vorname, email, adresse]);

    // enum Geschlescht {           
    //     MÄNNLICH = "MÄNNLICH",
    //     WEIBLICH = "WEIBLICH",
    //     DIVERS = "DIVERSE"
    // }


    const addPerson = async (person: Person) => {
        let r = await addContact(person)
        console.log(person);
    }

    function aktionSave(evt: React.FormEvent<HTMLElement>) {
        evt.preventDefault();
        const one: Person = {
            id: 0,
            vorname: vorname,
            name: name,
            geburstdatum: geburstdatum,
            titel: titel,
            email: email,
            geschlecht: geschlecht,
            adresse: adresse

        };

        addPerson(one).then(() => {
            getAdressbuch()
            setVorname('');
            setName('');
            setTitel("");
            setEmail("");
            setGeschlecht("");
            setGeburstdatum("");
            setAdresse("");
            setError('saved');
            setShowAlertError(true);
            setTimeout(() => { setShowAlertError(false) }, 1000);
        });

    }


    const handleSubmit = (e: React.FormEvent<HTMLElement | any>) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);       
        if (valid === true) {
            aktionSave(e);
        }


    }

    // const registerEkfAktion = (evt: React.KeyboardEvent) => {
    //     if (evt.key.toLowerCase() === 'enter') {
    //         inputAktionTextRef.current !== null && inputAktionTextRef.current.focus();
    //     }
    // };

    // const registerEkfAktionText = (evt: React.KeyboardEvent) => {
    //     const keyPressed = evt.keyCode || evt.which;
    //     if (keyPressed == 13) {
    //         saveButtonRef.current !== null && saveButtonRef.current.focus();
    //     }
    // };

    return (<><div>
  <Container fluid={true} className="d-flex">
            {/* left-side */}
            <Container fluid={true} className="w-50">
        <Form noValidate validated={validated} onSubmit={evt => handleSubmit(evt)}>
            {error && <Alert variant="info" show={showAlertError}>{error}</Alert>}
            <div className="row">
                <div className="col-simplebar-placeholder">
                    <h5>Neue Person </h5>
                </div>
            </div>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="titel">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        // ref={inputAktionIdRef}
                        isInvalid={titel === "" ? true : false}
                        placeholder="titel"
                        name="titel"
                        required
                        type="text"
                        value={titel}
                        onChange={(event) => {
                            setTitel(event.currentTarget.value);

                        }}
                    // onKeyPress={registerEkfAktion}
                    />
                    <Form.Control.Feedback type="invalid">
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="vorname">
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        isInvalid={vorname === "" ? true : false}
                        required
                        type="text"
                        placeholder="vorname"
                        value={vorname}
                        onChange={(event) => {
                            setVorname(event.currentTarget.value);

                        }}
                    // onKeyPress={registerEkfAktion}
                    />
                    <Form.Control.Feedback type="invalid">invalid</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>


            <Form.Row>
                <Form.Group as={Col} md="12" controlId="nachname">
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        ref={inputAktionTextRef}
                        isInvalid={name === "" ? true : false}
                        placeholder="Nachname"
                        name="nachname"
                        required
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.currentTarget.value);
                        }}
                    // onKeyPress={registerEkfAktionText}
                    />
                    <Form.Control.Feedback type="invalid">invalid</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        ref={inputAktionTextRef}
                        isValid={(email === "" ? false : true) && String(email).includes('@')}
                        required
                        placeholder="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.currentTarget.value);
                        }}
                    // onKeyPress={registerEkfAktionText}
                    />
                    <Form.Control.Feedback type="invalid">Sie müssen @ typen</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="geburstdatum">
                    <Form.Label>Geburstdatum</Form.Label>
                    <DatePicker selected={geburstdatum} onChange={date => setGeburstdatum(date)} />
                    <Form.Control.Feedback type="invalid">invalid</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="geshlecht">

                    <Form.Label>Geshlecht</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..."
                     onChange={(e) => (setGeschlecht(e.target.value))}

                
                    >
                        <option value="DIVERS">{Geschlescht.DIVERS}</option>
                        <option value="MÄNNLICH">{Geschlescht.MÄNNLICH}</option>
                        <option value="WEIBLICH">{Geschlescht.WEIBLICH}</option>
                        
                    </Form.Control>

                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="adresse">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        ref={inputAktionTextRef}
                        isInvalid={adresse === "" ? true : false}
                        required
                        placeholder="adresse"
                        name="adresse"
                        type="text"
                        value={adresse}
                        onChange={(e) => (setAdresse(e.target.value))}
                    // onKeyPress={registerEkfAktionText}
                    />
                    <Form.Control.Feedback type="invalid">invalid</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Button
                ref={saveButtonRef}
                type="submit"
                className={` "" ${nocookie ? 'disabled' : ''}`}
            >
                Hinzufügen
                                                        </Button>
        </Form>
        </Container>
        </Container>
    </div>
    </>

    );
}
export default PersonHinzufuegen;