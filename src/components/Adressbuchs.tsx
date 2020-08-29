
import * as React from 'react'
import {Link} from "react-router-dom";
import {Person} from '../types/Person'
import { getContacts } from "./services/Requests";

export interface AdressbuchProps{}



const Adressbuchs: React.SFC<AdressbuchProps>=  (props)=>{
    const [personal, setPersonal]=React.useState<Person[]>([]);

   const getAdressbuch=async ()=>{
    let r=(await getContacts()).data
    // let adressbuchs=await r.json();
    setPersonal(r);
   }
   React.useEffect(()=>{getAdressbuch();},[])
  
return(
    <section className="row my-2">
    <ul className="col-md-6 offset-md-3 list-group">
        {personal.map(person=>(
            <li key={person.id} className="list-group-items d-flex justify-content-between">
                <h3><td> </td>  
                  <th>{person.vorname}</th>                  
                  <td>{person.name} </td>  
                  <td> {person.geschlecht} </td>  
                  <td> {person.geburstdatum} </td>  
                  <td> {person.email} </td>  
                  <td> <Link to={`/${person.name}/details`} className="btn btn-info shadow-sm"> Detail</Link> </td>  
                </h3>
            </li>
        ))}
    </ul>
</section>
)
   
}
export default Adressbuchs;