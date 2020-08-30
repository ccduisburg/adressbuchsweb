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

interface PathVariables {
  name: string;
}
interface Props extends RouteComponentProps {
  match: match<PathVariables>;
}

const Header2: SFC<Props> = ({ match }) => {
  return (
    <>
      <Router>
        <Navbar bg="light" className="mb-2">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to={`${match.path}/detail`}>
                Persondetails
                        </Nav.Link>
              <Nav.Link as={Link} to={`${match.path}/personadd`}>
                Personhinzufügen
                        </Nav.Link>
              <Nav.Link as={Link} to={`${match.path}/personen`}>
                Personen
                        </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>

          </Form>
        </Navbar>
        <Route path={`${match.path}/detail`} component={PersonDetail} />
        <Route path={`${match.path}/personadd`} component={PersonHinzufuegen} />
        <Route path={`${match.path}/personen`} component={PersonList} />
      </Router>


    </>
  );
};
export default Header2;