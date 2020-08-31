import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import React, { SFC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
  match
} from "react-router-dom";
import PersonDetail from "../components/Details";
import PersonList from "../components/PersonList";
import PersonHinzufuegen from "../components/PersonHinzufuegen";



const Header2: SFC = () => {
  
  return (
    <>
   
        <Navbar bg="light" className="mb-2">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
           
              <Nav.Link as={Link} to={`/header/personadd`}>
                Personhinzufügen
                        </Nav.Link>
              <Nav.Link as={Link} to={`/header/personen`}>
                Personen
                        </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>

          </Form>
        </Navbar>
 


    </>
  );
};
export default Header2;