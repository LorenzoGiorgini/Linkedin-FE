import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Profile from "./views/Profile";
import Home from "./views/Home"

import "./CssStyles/Jumbo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";


function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/profile/:id" exact render={() => <Profile />} />
          <Route path="/feed/" exact render={() => <Home />} />
          <Route render={() => <Redirect to="/feed/" />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;