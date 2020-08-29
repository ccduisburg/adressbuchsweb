import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import React, { SFC } from "react";
import { BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps,
    match
   } from "react-router-dom";
import PersonDetail from "../components/Details";
import PersonList from "../components/PersonList";
import PersonHinzufuegen from "../components/PersonHinzufuegen";

interface PathVariables {
  name: string;
}
interface Props extends RouteComponentProps{
  match: match<PathVariables>;
}

const Header2: SFC<Props> = ({match}) => {
    return (
        <>
          <Router>
          <Navbar bg="light" className="mb-2">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={`${match.path}/persondetail`}>
                          Person update
                        </Nav.Link>
                        <Nav.Link as={Link} to={`${match.path}/personadd`}>
                         Person add
                        </Nav.Link>
                        <Nav.Link as={Link} to={`${match.path}/personen`}>
                           Person List
                        </Nav.Link>                       
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
    <Button type="submit">Suchen</Button>
  </Form>
            </Navbar>
             <Route path={`${match.path}/persondetail`} component={PersonDetail} /> 
            <Route path={`${match.path}/personadd`} component={PersonHinzufuegen} />
            <Route path={`${match.path}/personen`} component={PersonList} />
          </Router>
          
         
        </>
    );
};
export default Header2;