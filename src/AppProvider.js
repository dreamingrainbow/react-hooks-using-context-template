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
