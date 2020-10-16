import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css";

// Components
import NavBar from './components/NavBar';
import Main from './components/Main';

export default class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/">
          <React.Fragment>
            <NavBar date={this.date}/>
            <Main />
          </React.Fragment>
        </Route>
      </Router>
    )
  }
}


