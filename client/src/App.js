import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageRender from "./PageRender";
//import Home from "./pages/home";
import Login from "./pages/login";
//import Chat from "./pages/chat";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

function App() {
  const { auth /*, status, modal*/ } = useSelector((state) => state);

  console.log("auth :        " + auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {<SocketClient />}
          <Route exact path="/" component={Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
