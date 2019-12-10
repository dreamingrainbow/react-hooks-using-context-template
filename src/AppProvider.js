/**
 * Copyright M.A.D. Computer Consulting LLC 2019
 * Example Create-React-App -- ReactJs Hooks using Context
 * @fileOverview AppProvider.js Setup the Application Context Provider.
 * @author Michael A. Dennis <michaeladennis@yahoo.com>
 * @version 0.0.1
 */
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
