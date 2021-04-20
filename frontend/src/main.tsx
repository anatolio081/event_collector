import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";
/** @ts-expect-error*/
import SnackbarProvider from "@brancol/react-snackbar";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider rootComponent={TransitionGroup}>
        <SnackbarProvider
          successColor="rgb(16, 185, 129)"
          dangerColor="rgba(239, 68, 68)"
        >
          <App />
        </SnackbarProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
