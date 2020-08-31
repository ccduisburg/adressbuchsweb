import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Router, RouteComponentProps, match } from 'react-router-dom';
import Adressbuchs from './components/Adressbuchs';
import Details from './components/Details';
import PersonList from './components/PersonList';
import HomePage from './app/HomePage';

import PersonDetail from './components/Details'
import PersonHinzufuegen from './components/PersonHinzufuegen';


const App: React.SFC = (props) => {
  return (

      <BrowserRouter> 
      
      <HomePage/>
        <Route path={`/header/details/:id`} component={PersonDetail} />
        <Route path={`/header/personadd`} component={PersonHinzufuegen} />
        <Route path={`/header/personen`} component={PersonList} />          
       
  
    </BrowserRouter>

  )
}


export default App;
