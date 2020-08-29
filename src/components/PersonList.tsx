import * as React from 'react';
import { Alert, Button, Form, Nav, FormControlProps, InputGroup, Row, Col } from 'react-bootstrap';
import { DataTableColumn } from './DataTable/types';
import * as TimeUtils from '../util/TimeUtil';
import DataTable from './DataTable/DataTable';
import TableEditorText from './DataTable/Text';
import useDataTableWithPagination from './DataTable/useDataTableWithPagination';
import { Person } from '../types/Person';
import { InputPerson } from '../types/DataTypes';
import { editContact, deleteContact, getContacts, addContact, getPersonbyname, getPersonbyemail } from './services/Requests';
import DataTablePagination from './DataTable/Pagination';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

export interface AdressbuchProps { }

const PersonList: React.SFC<AdressbuchProps> = (props) => {
  const [nameFilter, setNameFilter] = React.useState<string | null>("");
  const [emailFilter, setEmailFilter] = React.useState<string | null>('');
  const [vorname, setVorname] = React.useState<string | any>();
  const [name, setName] = React.useState<string | any>();
  const [sorts, setSorts] = React.useState<[]>([]);
  const [geburtsdatum, setGeburtsdatum] = React.useState<string | any>();
  type FormElem = React.FormEvent<HTMLFormElement | HTMLButtonElement>;
  type FormContr = React.FormEvent<FormControlProps>;
  const MySwal = withReactContent(Swal)
  const [personal, setPersonal] = React.useState<Person[]>([]);

  const getAdressbuch = async () => {
    let r = (await getContacts()).data
    setPersonal(r);
  }
  const getPersonByname = async () => {
    let r = (await getPersonbyname(nameFilter!)).data
    setPersonal(r);
  }
  const findPersonbyemail = async () => {
    let r = (await getPersonbyemail(emailFilter!)).data
    setPersonal(r);
  }
  React.useEffect(() => { getAdressbuch(); }, []);
  React.useEffect(() => { if(nameFilter!=""){getPersonByname()}else getAdressbuch(); }, [nameFilter]);
  React.useEffect(() => { if(emailFilter!=""){findPersonbyemail();}else getAdressbuch() }, [emailFilter]);

  function personDelete(id: number) {
    MySwal.fire({
      text: 'Würden Sie die Datei löschen?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nein',

    }).then(result => {
      if (result.value) {
        deleteContact(id).then(() => getAdressbuch());
        Swal.fire('Gelöscht!', 'Ihre Datei wurde gelöscht', 'success');
        //   } else if (result.dismiss === Swal.DismissReason.cancel) {
        //     Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });

  };
  const columns: DataTableColumn<Person>[] = [
    {
      name: 'Vorname',
      accessor: row => <TableEditorText value={row.vorname || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: value,
              name: row.name,
              geburstdatum: row.geburstdatum,
              titel: row.titel,
              email: row.email,
              geschlecht: row.geschlecht,
              adresse: row.adresse

            };
            addContact(one).then(() => { getAdressbuch() }
            );
          }
        }
      } />,
      sortBy: { fieldName: 'vorname' },
    },

    {
      name: 'Nachname',
      accessor: row => <TableEditorText value={row.name || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: row.vorname,
              name: value,
              geburstdatum: row.geburstdatum,
              titel: row.titel,
              email: row.email,
              geschlecht: row.geschlecht,
              adresse: row.adresse

            };
            addContact(one).then(() => { getAdressbuch() }

            );
          }
        }
      } />,
    },

    {
      name: 'E-mail',
      accessor: row => <TableEditorText value={row.email || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: row.vorname,
              name: row.name,
              geburstdatum: row.geburstdatum,
              titel: row.titel,
              email: value,
              geschlecht: row.geschlecht,
              adresse: row.adresse

            };
            addContact(one).then(() => { getAdressbuch() }

            );
          }
        }
      } />,
      sortBy: { fieldName: 'email' },
    },

    {
      name: 'Title',
      accessor: row => <TableEditorText value={row.titel || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: row.vorname,
              name: row.name,
              geburstdatum: row.geburstdatum,
              titel: value,
              email: row.email,
              geschlecht: row.geschlecht,
              adresse: row.adresse

            };
            addContact(one).then(() => { getAdressbuch() }

            );
          }
        }
      } />,
      sortBy: { fieldName: 'email' },
    },
    {
      name: 'Geschlecht',
      accessor: row => <TableEditorText value={row.geschlecht || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: row.vorname,
              name: row.name,
              geburstdatum: row.geburstdatum,
              titel: value,
              email: row.email,
              geschlecht: row.geschlecht,
              adresse: row.adresse

            };
            addContact(one).then(() => { getAdressbuch() }

            );
          }
        }
      } />,
      sortBy: { fieldName: 'email' },
    },
    {
      name: 'Geburtsdatum ', accessor: row => (
        row.geburstdatum !== null ? TimeUtils.convertAndFormatTimestamp(String(row.geburstdatum)) : ''

      )
    },
    {
      name: 'Adresse',
      accessor: row => <TableEditorText value={row.adresse || ''} setValue={
        value => {
          if (value.length !== 0) {
            const one: Person = {
              id: row.id,
              vorname: row.vorname,
              name: row.name,
              geburstdatum: row.geburstdatum,
              titel: value,
              email: row.email,
              geschlecht: row.geschlecht,
              adresse: value

            };
            addContact(one).then(() => { getAdressbuch() }

            );
          }
        }
      } />,
      sortBy: { fieldName: 'adresse' },
    },
    {
      name: 'Löschen',
      accessor: row => (
        <Button variant="primary" onClick={() => { personDelete(row.id); }
        }>
          löschen
        </Button>
      ),
    },
    {
      name: 'Details',
      accessor: row => (
        <Link to={`/${row.id}/details`} className="btn btn-info shadow-sm"> Detail</Link>  
      ),
    }

   
  ];
  return (<>

    <Form.Row>
      <Form.Label>Suchen</Form.Label>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} md="6" controlId="suchen">

        <Form.Control
          className="form-form-control-plaintext"
          type="text"
          value={`${nameFilter}`}
          onChange={(event) => {
            setNameFilter(String(event.currentTarget.value));
          }}
          placeholder="Name"
        />

      </Form.Group>
      <Form.Group as={Col} md="6" controlId="suchen">
        <Form.Control
          className="form-form-control-plaintext"
          type="text"
          value={`${emailFilter}`}
          onChange={(event) => {
            setEmailFilter(String(event.currentTarget.value));
          }}
          placeholder="email"
        />
      </Form.Group>
    </Form.Row>



    <DataTable
      idColumnName="id"
      data={personal && personal ? personal : null}
      columns={columns}
      showHeader
      showSuche
    />
  </>)
};
export default PersonList;