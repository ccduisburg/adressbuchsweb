import React,{ SFC } from "react"
import Header2 from "./Header2"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersonList from "../components/PersonList";
import Details from "../components/Details";
import PersonHinzufuegen from "../components/PersonHinzufuegen";

const HomePage:SFC=()=>{
return(
   
<Switch>
<Route  path="/header" component={Header2} />    
     <Route path="/add" component={PersonHinzufuegen}/>  
      <Route exact path="/list" component={PersonList}/> 
       <Route  path="/:id/details"     
      render={ (props) => <Details {...props}/>}/>
       {/*component={Details} */}
</Switch>
    
 
);
}
export default HomePage; 