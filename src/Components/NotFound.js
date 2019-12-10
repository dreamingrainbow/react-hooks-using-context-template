import React from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../AppContext";
export default withRouter(function NotFound(props) {
  return (
    <AppContext.Consumer {...props}>
      {context => (
        <div className="App">
          <header className="App-header">
            <p>The page was Not Found!</p>
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
      )}
    </AppContext.Consumer>
  );
});
