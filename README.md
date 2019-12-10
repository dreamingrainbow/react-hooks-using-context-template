# _Example Create-React-App_ #

## _-- ReactJs Hooks using Context --_ ##

***
This application is an example of how you can use ReactJs Hooks Context implementation with advanced routing and composed components.

Fork the repository or learn to build it on your own by following the tutoral below.
***

## _Learn to build with ReactJs Hooks_ ##

To begin let's install the latest version of NodeJs, and Create-React-App. If you need help with that, follow one of these guides to help you in getting started.

### _INDEX_ ###

1. NodeJs
    1. [Node](https://nodejs.org/)

1. Create-React-App
    1. [ReactJS](https://reactjs.org/)

1. **index.js** The entry point. This is where we start.

1. **AppProvider.js** Provide context to our application.

1. **AppContext.js** Set up our default context state.

1. **AppFunction.js** Add our state management functions to our context.

1. **App.js** Bootstrap our theme, and layout.

1. **Default.js** The Default page -- Where everyone lands.

1. Authentication Securing sections with authentication state events.

1. **Component/Composed.js** Composed Component give your the finest control over the components rendered.

1. **Component/ComplexRouter.js** React-Router Simple to Complex Route management using nexted routes.

1. Server Pages
    1. **NotFound.js** Page Not Found. Catch all routes.
    1. **PermissionDenied.js** Deny visitors from accessing secured areas using complete customizable pages based on your desired applicaton needs.

Awesome, thanks for checking this out. Once you have completed, this tutorial you should be able to build your own react applicatoni using ReactJs Hooks.

Let's get started and open up the `index.js` file. We are going to setup the bootstrapping process for our appliation. Then we will add the first section we will cover in this this tutorial. **The Application Context Provider**, covered in section one is what will provide our initial context, and help us to manage the context in our application but first we need to add it to our entry point file.

***
***

#### **index.js** ####

```js
import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./AppProvider";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <AppProvider>
    <App />
</AppProvider>,
document.getElementById("root")
);
// Learn about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

***

#### _Section One: The Application Context Provider_ ####

***

##### **AppProvider.js** #####

```js
import React from "react";
import { MyContext, AppContext } from "./AppContext";
import { AppFunctions } from "./AppFunctions";

export default class AppProvider extends React.Component {
  functions = AppFunctions;
  state = MyContext;
  render() {
    return (
      <AppContext.Provider
        value={Object.assign(this.state, this.functions(this.props))}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
```

The  Application Context Provider bootloads our context in to our application. Here we don't really do much more than instantiate our context, and setup our functions, mapping both to the context object. The way we have this setup we shouldn't need to update this file again.
***

### _Section Two: *Application Context*_ ###

***

#### _The Application Context_ ####

##### **AppContext.js** #####

```js
import React from "react";
const MyContext = {
    site: {
        title: "Template | React Hooks using Context",
        dropdownOpen: false,
        pendingAuthentication: false,
        authenticated: false
    }
};
const AppContext = React.createContext(MyContext);
export { AppContext, MyContext };
```

The Application Context is the default context object. This will use it to manage and setup our default application state. In this file we will put all of our base state object into our context object.
***

### _Section Three: *Application State Functions*_ ###

***

#### _The Application State Functions_ ####

The AppFunctions are used to manage our state calls. We will create a function for each or our actions that need to handle state.

##### **AppFunctions.js** #####

```js
export function AppFunctions(props) {
  const toggleDropdown = () => {
    const stateUpdate = this.state;
    stateUpdate["site"]["dropdownOpen"] = !this.state["site"]["dropdownOpen"];
    this.setState(stateUpdate);
  };

  const toggleAuthenticated = () => {
    const stateUpdate = this.state;
    stateUpdate["site"]["authenticated"] = !this.state["site"]["authenticated"];
    stateUpdate["site"]["pendingAuthentication"] = !this.state["site"][
      "pendingAuthentication"
    ];
    this.setState(stateUpdate);
  };

  const togglePendingAuthentication = () => {
    const stateUpdate = this.state;
    stateUpdate["site"]["pendingAuthentication"] = !this.state["site"][
      "pendingAuthentication"
    ];
    this.setState(stateUpdate);
  };

  const authenticate = () => {
    const x = toggleAuthenticated;
    setTimeout(x, 1500);
    togglePendingAuthentication();
  };

  const logout = () => {
    const stateUpdate = this.state;
    stateUpdate["site"]["authenticated"] = !this.state["site"]["authenticated"];
    this.setState(stateUpdate);
  };

  return {
    toggleDropdown,
    toggleAuthenticated,
    togglePendingAuthentication,
    authenticate,
    logout
  };
}
```

In our file AppFunction.js we return our state management object with each of our function. These function will make it so that we can toggle our sections, authenticate, and handle other operations we will need to create state events in our application.

***

### _Section Four: *The Main Application Component*_ ###

***

#### _The Application Component_ ####

Within our Application component we will add our context, router, and base routes.

##### **App.js** #####

```js
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
```

In our `App.js` file we demonstrate the use of the useEffect hook, with a cleanup return to clear the timer event, we want to insure we do this so we do not have memory leaks in our application.

***

### _Section Five: *Application Default Component*_ ###

***

#### _The Application Default Component_ ####

This is the primary landing page content. We can turn this section in to our main page for our application. Think of it as our entry point for the client's view.

##### **Components/Default.js** #####

```js
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
```

This Default Component is our main theme, and has links to sub areas of the application.
***

### _Section Six: *Application Authentication*_ ###

***

#### _The Application Authentication_ ####

In this example we did not go into details of actual authentication procedures, however, using our Application function we show the process of an async state event. First in out `authenticate` function
we set the state to say we are `pendingAuthentication`. Using a timer event we then set the `authenticated` state to true by calling our `toggleAuthenticated` function.

##### **authenticate** #####

```js
const authenticate = () => {
const x = toggleAuthenticated;
setTimeout(x, 1500);
togglePendingAuthentication();
};
```

The timeout event will trigger the `toggleAuthenticated` function

##### **toggleAuthenticated** #####

```js
const toggleAuthenticated = () => {
const stateUpdate = this.state;
stateUpdate["site"]["authenticated"] = !this.state["site"]["authenticated"];
stateUpdate["site"]["pendingAuthentication"] = !this.state["site"][
    "pendingAuthentication"
];
this.setState(stateUpdate);
};
```

Once we are authenticated we should allow the user to log out, or go to secure area's of the application.
***

### _Section Seven: *Application Dashboard Component*_ ###

***

#### _The Application Dashboard Component_ ####

##### **Components/Dashboard.js** #####

```js
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
```

This Dashboard Component is an authenticated view area. Setup this page to handle authenticated user features and functions.
***

### _Section Eight: *Composed Components*_ ###

***

#### _Composed Components_ ####

##### **Components/Composed.js** #####

```js
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext  } from "../AppContext";
export default withRouter(function Composed(props) {
  const context = React.useContext(AppContext);
  return (
    <div className="App">
      <header className="App-header">
        <p>Composed Components</p>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      {context.site.authenticated ? (
        <Link to="/dashboard">
          <button type="button">Dashboard</button>
        </Link>
      ) : null}
      <button onClick={props.history.goBack.bind(this)}>Go Back</button>
      <p>This component like most of the files in the example are composed components. </p>
      </header>
    </div>
  );
});
```

This Composed Component, like many of the components in this example use a method of composing the components to pass arugments, data, state, and events on to other components that need advanced handling logic.

***

### _Section Nine: *Application Complex Routing*_ ###

***

#### _Complex Routing using React Router_ ####

##### **Components/ComplexRouter.js** #####

```js
import React from "react";
import { withRouter, Link, Switch, Route } from "react-router-dom";
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
        <Switch>
          <Route
            path="/complex-router/a"
            exact
            component={A}
          />
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
```

This Complex Routing Component is just another example of how simple you can make even the most complex applications.

***

### _Section Ten: *Application Default Server Components*_ ###

***

#### _The Application Not Found Component_ ####

##### **Components/NotFound.js** #####

```js
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
```

This Component is use to tell the client they have come across a page that cannot be located, or the resouces they are not found.

##### **Components/PermissionDenied.js** #####

```js
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../AppContext";

export default withRouter(function PermissionDenied(props) {
  const context = React.useContext(AppContext);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Permission Denied -- Please Sign In and try again or contact support
            for additional help.
          </p>
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
```

This Component is used to tell the client they have reached a route they do not have permissions for, here is a good chance to have them sign in, or authenticate for a high level of privileges.

***
***

That wraps up our application, if we have followed the tutorial we should now have an application that looks something like the default Creat-React-App, with a few buttons to demonstrate our work.
Hope this helps you in your future development needs.
