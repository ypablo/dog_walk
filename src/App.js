import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Contact from "./components/Contact/Contact"
import Default from "./components/Default/Default"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route component={Default} />
          </Switch>
        </div>
      </Router>
    )
  }
}
