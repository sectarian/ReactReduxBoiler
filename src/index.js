import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import Thunk from "redux-thunk";

import App from "./containers/App";
import reducers from "./reducers";

const store = applyMiddleware(Thunk, ReduxPromise)(createStore);

render(
  <Provider store={store(reducers)}>
    <App />
  </Provider>,
  document.querySelector("#content")
);
