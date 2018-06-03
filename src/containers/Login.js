import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { auth, db, loginProcessing } from "../base";
import firebase from "firebase";

import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../css/login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirectToRegister: false
  };

  handleSubmit = evt => {
    evt.preventDefault();

    // if an unverified user is signed in, sign them out to trigger the auth listener
    if (auth.currentUser) {
      auth.signOut();
    }
    // sign in the user
    auth.signInWithEmailAndPassword(this.state.email, this.state.password);
    loginProcessing();
  };

  // sign in with a provider (google or facebook)
  providerSignIn = prov => {
    let provider;
    if (prov === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (prov === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else {
      console.log("error");
    }
    auth.signInWithRedirect(provider);
    loginProcessing();
  };

  loginCheck = () => {
    return localStorage.getItem("loginProcessing");
  };

  goToRegister = () => {
    this.setState({ redirectToRegister: true });
  };

  render() {
    // else render login form
    return (
      <div className="wrapper">
        <section className={styles.login}>
          {this.state.redirectToRegister && <Redirect to={"/register"} />}

          <h1 className={styles.header}>Login</h1>

          {this.loginCheck() && <p>Loading...</p>}

          {!this.loginCheck() && (
            <div>
              <form onSubmit={this.handleSubmit} className={styles.form}>
                <Input
                  val={this.state.email}
                  place="email address"
                  action={e => this.setState({ email: e.target.value })}
                />

                <Input
                  inType="password"
                  val={this.state.password}
                  place="password"
                  action={e => this.setState({ password: e.target.value })}
                />

                <Button classy="confirm" text="Sign In" buttType="submit" />
              </form>
              <div className={styles.form}>
                <Button
                  classy="text-only"
                  text="Don't have an account? Sign up here!"
                  action={this.goToRegister}
                />
                <Button
                  classy="google"
                  text="Sign in with Google"
                  action={this.providerSignIn.bind(this, "google")}
                />
                <Button
                  classy="facebook"
                  text="Sign in with Facebook"
                  action={this.providerSignIn.bind(this, "facebook")}
                />
                <Input
                  inType="checkbox"
                  name="noExpire"
                  label="Keep me signed in for 2 weeks"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Login;
