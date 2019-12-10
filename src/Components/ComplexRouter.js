import React from "react";
import { withRouter, Link, Switch, Route } from "react-router-dom";
import { AppContext } from "../AppContext";
export default withRouter(function ComplexRouter(props) {
  const context = React.useContext(AppContext);
  return (
    <div className="App">
      <header className="App-header">
        <p>Complex Router Example</p>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        {context.site.authenticated ? (
          <Link to="/dashboard">
            <button type="button">Dashboard</button>
          </Link>
        ) : null}
        <button onClick={props.history.goBack.bind(this)}>Go Back</button>
        <Switch>
          <Route path="/complex-router/a" exact component={A} />
          <Route
            path="/complex-router/b"
            component={() => <p>Keep It Simple, and Organized.</p>}
          />
          <Route
            path="/complex-router/c"
            component={() => <p>Reusable Components make building simple!</p>}
          />
        </Switch>
        <Link to="/complex-router/a">
          <button type="button">A</button>
        </Link>
        <Link to="/complex-router/b">
          <button type="button">B</button>
        </Link>
        <Link to="/complex-router/c">
          <button type="button">C</button>
        </Link>
      </header>
    </div>
  );
});

export function A() {
  return <p>Nest As Deep As You Want</p>;
}
