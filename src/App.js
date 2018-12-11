import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import SingleMovie from "./components/pages/SingleMovie";
import Payment from "./components/pages/Payment";
import Booking from "./components/pages/Booking";
import { AppProvider } from './/Context'

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/movie/:title/:id/view"
                component={SingleMovie}
              />
              <Route
                exact
                path="/movie/:title/:prefferedDate/:prefferedTime/:runtime/book"
                component={Booking}
                />
            </Switch>
          </React.Fragment>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
