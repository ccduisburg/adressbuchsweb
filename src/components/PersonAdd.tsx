
import React, { SFC, useState } from 'react';
import { addContact, getContacts, getPersonbyname } from './services/Requests';
import { Person } from '../types/Person';
import { RouteComponentProps } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
export interface DetailsProps extends RouteComponentProps<{ id: string; }> { }

const PersonAdd: SFC = () => {
    const [vorname, setVorname] = useState<string | any>();
    const [name, setName] = useState<string | any>();
    const [email, setEmail] = useState<string | any>();
    const [geschlecht, setGeschlecht] = useState<string | any>();
    const [titel, setTittel] = useState<string | any>();
    const [adresse, setAdresse] = useState<string | any>();

    const [geburtsdatum, setGeburtsdatum] = useState<string | any>();

    const [person, setPerson] = useState<Person>({
        id: 0,
        titel: titel,
        name: name,
        vorname: vorname,
        email: email,
        geschlecht: geschlecht,
        geburstdatum: geburtsdatum,
        adresse: adresse

    })

    const addPerson = async () => {
        let r = await addContact(person)
        console.log(person);
    }

    React.useEffect(() => {
        setPerson({
            id: 0,
            titel: titel,
            name: name,
            vorname: vorname,
            email: email,
            geschlecht: geschlecht,
            geburstdatum: geburtsdatum,
            adresse: adresse
        });
    }, [name, vorname, email]);


    return (
        <form id="add-person" onSubmit={e => {


            e.preventDefault();

        }}
        >
            <div className="field">
                <label>Vorname:</label>
                <input type="text" onChange={(e) => (setVorname(e.target.value))} />
            </div>

            <div className="field">
                <label>Name :</label>
                <input type="text" onChange={(e) => (setName(e.target.value))} />
            </div>
            <div className="field">
                <label>Email :</label>
                <input type="text" onChange={(e) => (setEmail(e.target.value))} />
            </div>
            <div className="field">
                <label>Geschlecht :</label>
                <input type="text" onChange={(e) => (setGeschlecht(e.target.value))} />
            </div>
            <div className="field">
                <label>Titel :</label>
                <input type="text" onChange={(e) => (setTittel(e.target.value))} />
            </div>
            <div className="field">
                <label>Geburtsdatum :</label>
                <input type="text" onChange={(e) => (setGeburtsdatum(e.target.value))} />
            </div>

            <button onClick={() => addPerson()}>Add</button>
        </form>

    )
}

export default PersonAdd;