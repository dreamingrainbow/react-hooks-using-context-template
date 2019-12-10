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
