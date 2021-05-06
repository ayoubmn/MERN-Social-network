import { combineReducers } from "redux";
import auth from "./AuthReducer";
import socket from "./socketReducer";
import alert from "../actions/alertReducer";

export default combineReducers({
  auth,
  socket,
  alert,
});
