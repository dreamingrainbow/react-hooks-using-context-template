import React from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { ReactComponent as Logo } from "../logo.svg";
export default withRouter(function Default(props) {
  const context = React.useContext(AppContext);
  const { site } = context;

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" alt="logo" id="Logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <section>
          <h3>Basic Routes </h3>
          <button onClick={context.toggleDropdown.bind(this)}>
            Toggle Advanced Routes
          </button>
          {!site.authenticated ? (
            <button
              onClick={context.authenticate.bind(this)}
              disabled={site.pendingAuthentication}
            >
              {site.pendingAuthentication ? "Authenticating" : "Authenticate"}
            </button>
          ) : (
            <React.Fragment>
              <button disabled={site.authenticated}>Authenticated</button>
              <button onClick={context.logout.bind(this)}>
                Log Out
              </button>
            </React.Fragment>
          )}
          <h3>Advanced Routes </h3>
          {site.authenticated ? (
            <React.Fragment>
              <Link to="/dashboard" >
              <button>Dashboard</button>
              </Link>
            </React.Fragment>
          ) : null}
          {site.dropdownOpen ? (
            <React.Fragment>
              <Link to="/composed-component" alt="">
                <button>Composed Component</button>
              </Link>
              <Link to="/complex-router" alt="">
                <button>Complex Router</button>
              </Link>
            </React.Fragment>
          ) : null}
        </section>
      </header>
    </div>
  );
});
