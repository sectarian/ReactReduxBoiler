import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import styles from "../css/register.css";
import Button from "../components/Button";

class Register extends Component {
  state = {
    email: "",
    password: "",
    emailSent: false,
    redirectToLogin: false
  };

  handleSubmit = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("registeredtop");
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            console.log("email sent");
            this.setState({ emailSent: true });
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log("registeredbottom");
      })
      .catch(function(error) {
        // Handle Errors here
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
  };

  goToLogin = () => {
    this.setState({ redirectToLogin: true });
  };

  render() {
    {
      this.state.goToLogin && <Redirect to={"/login"} />;
    }
    if (this.state.emailSent || this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="wrapper">
          <section className={styles.register}>
            <form onSubmit={this.handleSubmit} className={styles.form}>
              <label className={styles.label}>Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                className={styles.input}
              />
              <label className={styles.label}>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                className={styles.input}
              />
              <button type="submit" className={styles.submit}>
                Register
              </button>

              <Button
                classy="reject"
                text="Back to Login"
                action={this.goToLogin}
              />
            </form>
          </section>
        </div>
      );
    }
  }
}

export default Register;
