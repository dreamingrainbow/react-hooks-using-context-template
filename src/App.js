import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext } from "./AppContext";

import "./App.css";

import DefaultComponent from "./Components/Default";
import ComplexRouterComponent from "./Components/ComplexRouter";
import ComposedComponent from "./Components/Composed";
import NotFoundComponent from "./Components/NotFound";
import PermissionDenied from "./Components/PermissionDenied";
import Dashboard from "./Components/Dashboard";

function App() {
  const context = useContext(AppContext);
  const { site } = context;
  useEffect(() => {
    document.title = site.title;
    return;
  });
  return (
    <Router>
      <Switch>
        <Route path="/" component={DefaultComponent} exact />

        <Route path="/Permission-Denied" component={PermissionDenied} exact />

        <Route
          path="/dashboard"
          component={props =>
            site.authenticated ? <Dashboard /> : <PermissionDenied />
          }
          exact
        />

        {site.dropdownOpen ? (
          <Route
            path="/complex-router"
            component={ComplexRouterComponent}
            context={context}
          />
        ) : null}

        <Route path="/composed-component" component={ComposedComponent} />

        <Route component={NotFoundComponent} />
      </Switch>
    </Router>
  );
}

export default App;
