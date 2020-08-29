import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Adressbuchs from './components/Adressbuchs';
import Details from './components/Details';
import PersonList from './components/PersonList';
import HomePage from './app/HomePage';
import Header2 from './app/Header2';


const App:React.SFC=props=>{
  return (

       <BrowserRouter>           
         <Route  path="/" component={HomePage} />     
      </BrowserRouter>
   
  )
}


export default App;
