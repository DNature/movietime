import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/pages/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
