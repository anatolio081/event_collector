import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopMenu from "./pages/Events/TopMenu";
import Events from "./pages/Events/Event";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sessions from "./pages/Sessions/Sessions";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white h-screen flex overflow-hidden text-sm">
        <Sidebar />

        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <TopMenu></TopMenu>

          <Switch>
            <Route path="/sessions/:id" component={Events}></Route>
            <Route path="/" component={Sessions}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
