import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import { refreshToken } from "../src/redux/actions/AuthAction";
import { getPosts } from "./redux/actions/postAction";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { io } from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

function App() {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io("http://localhost:8000", {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("connect_error", (error) => {
      console.log("socketio Connection error: " + error);
    });

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}

          {auth.token && <SocketClient />}
          {status && <StatusModal />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <Route
            exact
            path="/:page"
            component={auth.token ? PageRender : Login}
          />
          <Route
            exact
            path="/:page/:id"
            component={auth.token ? PageRender : Login}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;

//      <input type="checkbox" id="theme" />
