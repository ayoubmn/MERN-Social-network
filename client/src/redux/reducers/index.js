import { combineReducers } from "redux";
import auth from "./AuthReducer";
import notify from "../actions/notifyReducer";
import socket from "./socketReducer";

export default combineReducers({
  auth,
  notify,
  socket,
});
