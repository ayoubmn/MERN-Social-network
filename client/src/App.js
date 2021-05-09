import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Alert from "./components/alert/Alert";
import { refreshToken } from "../src/redux/actions/AuthAction";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import Header from "./components/Header";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

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
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {auth.token && <SocketClient />}

          <Route exact path="/" component={auth.token ? Home : Login} />

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
