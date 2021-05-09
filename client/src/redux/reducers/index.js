import { combineReducers } from "redux";
import auth from "./AuthReducer";
import socket from "./socketReducer";
import alert from "../actions/alertReducer";
import message from "./messageReducer";
import theme from "../reducers/themeReducer";

export default combineReducers({
  auth,
  socket,
  alert,
  theme,
  message,
});
