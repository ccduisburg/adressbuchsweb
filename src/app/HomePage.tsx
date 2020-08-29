import React,{ SFC } from "react"
import Header2 from "./Header2"
import { BrowserRouter as Router, Route } from "react-router-dom";
import PersonList from "../components/PersonList";
import Details from "../components/Details";
import PersonHinzufuegen from "../components/PersonHinzufuegen";

const HomePage:SFC=()=>{
return(
   
    <Router>
    <Route  component={Header2} />    
     <Route exact path="/add" component={PersonHinzufuegen}/> 
     <Route exact path="/list" component={PersonList}/>
     <Route exact path="/:id/details" component={Details}/>  
    </Router>
);
}
export default HomePage; 