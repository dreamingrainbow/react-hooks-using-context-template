import React from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export default withRouter(function PermissionDenied(props) {
  const context = React.useContext(AppContext);

  return (
        <div className="App">
          <header className="App-header">
            <p>Dashboard</p>
            <Link to="/">
              <button type="button">Home</button>
            </Link>
            {context.authenticated ? <h1>Welcome to the dashboard.</h1> : null}
            <button onClick={props.history.goBack.bind(this)}>Go Back</button>
          </header>
        </div>
  );
});
