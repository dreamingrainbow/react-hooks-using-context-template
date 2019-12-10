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
