import React,{ SFC } from "react"
import Header2 from "./Header2"
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";
import PersonList from "../components/PersonList";
import Details from "../components/Details";
import PersonHinzufuegen from "../components/PersonHinzufuegen";

const HomePage:SFC=()=>{
return(
   <>
<Header2 />
    
 </>
);
}
export default HomePage; 