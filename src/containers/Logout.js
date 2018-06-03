import React, { Component } from "react";
import { auth } from "../base";
import Button from "../components/Button";

class Logout extends Component {
  logOut = () => {
    auth
      .signOut()
      .then(function() {
        // clear the login processing item
        localStorage.removeItem("loginProcessing");
        console.log("logged out");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return <Button text="Logout" classy="text-only" action={this.logOut} />;
  }
}

export default Logout;
