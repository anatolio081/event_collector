import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

/* @ts-expect-error */
import SnackbarProvider from "react-simple-snackbar";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider rootComponent={TransitionGroup}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
