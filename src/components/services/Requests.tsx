import { Person } from "../../types/Person";
import axios from 'axios';

const APIURL = 'http://localhost:8082';

export const getContacts = () => axios.get(`${APIURL}/person/personen`);
export const addContact = (data: Person) => axios.post(`${APIURL}/person/add`, data);
export const editContact = (data: Person) => axios.put(`${APIURL}/person/update/${data.id}`, data);
export const deleteContact = (id: number) => axios.delete(`${APIURL}/person/delete/${id}`);
export const getContact = (id: number) => axios.get(`${APIURL}/person/${id}`);
export const getPersonbyname = (name: string) => axios.get(`${APIURL}/person/name/${name}`);
export const getPersonbyvorname = (vorname: string) => axios.get(`${APIURL}/person/vorname/${vorname}`);
export const getPersonbyemail = (email: string) => axios.get(`${APIURL}/person/email/${email}`);