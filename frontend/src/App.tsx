import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopMenu from "./pages/Events/TopMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Events from "./pages/Events/Event";
import Sessions from "./pages/Sessions/Sessions";
import RawEvents from "./pages/Events/RawEvent";

// @ts-expect-error
import SnackbarProvider from "react-simple-snackbar";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";

import { useAppDispatch } from "./store/hooks";
import { setSession } from "./store/session";
import { SessionModel } from "./models/Session";
import socket, { SocketData } from "./socket";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`, err);
    });
    socket.off("message");
    socket.on("message", function (data: SocketData) {
      if ((data.type = "current_session")) {
        const { id, name, created_at, events } = data.data;
        dispatch(setSession(new SessionModel(id, name, created_at, events)));
      }
    });
    socket.connect();

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <ModalProvider rootComponent={TransitionGroup}>
      <SnackbarProvider>
        <Router>
          <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
            <Sidebar />

            <div className="flex-grow overflow-hidden h-full flex flex-col">
              <TopMenu></TopMenu>
              <Switch>
                <Route path="/sessions/:id" component={Events}></Route>
                <Route path="/raw-sessions/:id" component={RawEvents}></Route>
                <Route path="/" component={Sessions}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </SnackbarProvider>
    </ModalProvider>
  );
}

export default App;
