import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Homepage from './home-page/Homepage';

class App extends Component {

  public render(): JSX.Element {
    return (
      <Router>
        <Route exact={true} path="/" component={Homepage} />
      </Router>
    );
  }
}

export default App;
