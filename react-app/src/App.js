import React from 'react';
import './App.css';
import Pets from './component/Pets';
import Pet from './component/Pet';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


function App() {
  
  return (
    <div className="App">
      <a href="/pets">Pets</a>
       <Router>
                <Switch>
                    <Route path="/pets" component={Pets} />
                    <Route path="/pet/:id" component={Pet} />
                </Switch>
            </Router>
    </div>
  );
}

export default App;
