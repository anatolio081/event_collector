import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopMenu from "./pages/Events/TopMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Events from "./pages/Events/Event";
import Sessions from "./pages/Sessions/Sessions";
import RawEvents from "./pages/Events/RawEvent";

import { useAppDispatch } from "./store/hooks";
import { setSession } from "./store/session";
import { SessionModel } from "./models/Session";
import socket, { SocketData } from "./socket";


import { ToastContainer } from "react-toastify";
/*
 successColor="rgb(16, 185, 129)"
        dangerColor="rgba(239, 68, 68)"
        */



        

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

  const contextClass = {
    success: "bg-green-500",
    error: "bg-red-600",
    info: "bg-blue-500",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };
  
  return (
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
      <ToastContainer
        /* @ts-expect-error */
        toastClassName={({ type }) => contextClass[type || "default"] + 
        " relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mt-2"
      }
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </Router>
  );
}

export default App;
