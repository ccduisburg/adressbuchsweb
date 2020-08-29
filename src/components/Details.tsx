import * as React from 'react'
import {RouteComponentProps} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Person } from '../types/Person';
import { getContacts, getContact } from './services/Requests';
export interface DetailsProps extends RouteComponentProps<{id:string;}>{}


const Details: React.SFC<DetailsProps>=({history,match:{params:{id}}})=>{
const [vorname,setVorname]=useState<string|any>();
const [nachname,setNachname]=useState<string|any>();
const [geburtsdatum,setGeburtsdatum]=useState<string|any>();
const [email,setEmail]=useState<string|any>();
const [geschlecht,setGeschlescht]=useState<string|any>();
const [adresse,setAdresse]=useState<string|any>();
const [person, setPerson]=useState<Person>({
    id:0,
    titel:"",
    name:"",
    vorname:"",
    email:"",
    geschlecht:"",
    geburstdatum:new Date(),
    adresse: ""

 })
const getPerson=async ()=>{
    let r=(await getContact(Number(id))).data;   
    console.log(r);
    setPerson(r);
}

useEffect(()=>{getPerson();},[id]);

return(
    <section className="row my-5">
         return (
            <form id="add-person"  onSubmit={e => {
                e.preventDefault();             
           
                }}
            >
                <div className="field">
                    <label>Vorname:</label>
                    <input type="text" value={person.vorname} onChange={(e)=>(setVorname(e.target.value))}/>
                </div>

                <div className="field">
                    <label>Name :</label>
                    <input type="text" value={person.name} onChange={(e)=>(setNachname(e.target.value))}/>
                </div>
                {/* <div className="field">
                    <label>Email :</label>
                    <input type="text" value={person.email} onChange={(e)=>(setEmail(e.target.value))}/>
                </div> */}
                <div className="field">
                    <label>Geburtsdatum :</label>
                    <input type="text" value={String(person.geburstdatum)} onChange={(e)=>(setGeburtsdatum(e.target.value))}/>
                </div>    
                <div className="field">
                    <label>Geshlecht :</label>
                    <input type="text" value={person.geschlecht} onChange={(e)=>(setGeschlescht(e.target.value))}/>
                </div>   
                <div className="field">
                    <label>Adresse :</label>
                    <input type="text" value={person.adresse} onChange={(e)=>(setAdresse(e.target.value))}/>
                </div>                             
                  
                <button>Add</button>
            </form>
<button onClick={()=>history.goBack()}>Go Back</button>
</section>
)
   
}
export default Details;