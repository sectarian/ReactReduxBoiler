import React, { Component } from "react";
import {
  auth,
  storageKey,
  isAuthenticated,
  isVerified,
  loginProcessing
} from "../base";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Login from "../containers/Login";
import Home from "../containers/Home";
import Register from "../containers/Register";

class App extends Component {
  state = {
    uid: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({ uid: user.uid });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({ uid: null });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <RedirectWhenAuthorized exact path="/" component={Home} />
          <LoginCheck exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <MatchWhenAuthorized path="/home" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

// check for authorized and verified user before allowing into kitchen
const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps => {
      if (isAuthenticated() && isVerified()) {
        return renderMergedProps(Component, renderProps, rest);
      } else {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: renderProps.location } }}
          />
        );
      }
    }}
  />
);

// at login, check if user is already authenticated then redirect to kitchen. Else, render login
const LoginCheck = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated() && isVerified() ? (
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
      ) : (
        renderMergedProps(Component, renderProps, rest)
      )
    }
  />
);

// check for authorized and verified user then pass to appropriate page
const RedirectWhenAuthorized = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated() && isVerified() ? (
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: renderProps.location }
          }}
        />
      )
    }
  />
);

// function to render an element from ReactRouter with props
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

export default App;
