import React from "react";
import { withRouter, Link } from "react-router-dom";
import {AppContext} from "../AppContext";
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
      </header>
    </div>
  );
});