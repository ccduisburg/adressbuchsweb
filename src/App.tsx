import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Router, RouteComponentProps, match } from 'react-router-dom';
import Adressbuchs from './components/Adressbuchs';
import Details from './components/Details';
import PersonList from './components/PersonList';
import HomePage from './app/HomePage';
import Header2 from './app/Header2';
import PersonHinzufuegen from './components/PersonHinzufuegen';


const App: React.SFC = (props) => {
  return (

      <BrowserRouter>           
    {/* //    <Route  path="/header/personen" component={HomePage} />      */}
    
    <Switch>
      <Route path="/header" component={Header2} />
      <Route path="/add" component={PersonHinzufuegen} />
      <Route exact path="/list" component={PersonList} />
      <Route path="/:id/details" component={Details} />
    </Switch>
    </BrowserRouter>

  )
}


export default App;
