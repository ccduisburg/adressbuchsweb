import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Adressbuchs from './components/Adressbuchs';
import Details from './components/Details';
import PersonList from './components/PersonList';
import HomePage from './app/HomePage';


const App:React.SFC=props=>{
  return (

      <BrowserRouter>
          <main className="container"> 
          <HomePage/>    
       <Switch>
        <Route exact path="/list" component={PersonList}/>
        <Route exact path="/:id/details" component={Details}/>   
      
    
       </Switch> 
      </main>
      </BrowserRouter>
   
  )
}


export default App;
