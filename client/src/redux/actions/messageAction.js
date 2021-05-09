import { postDataAPI, getDataAPI } from "../../utils/fetchData";
export const MESS_TYPES = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATIONS: "GET_CONVERSATIONS",
  GET_MESSAGES: "GET_MESSAGES",
};

export const addUser = ({ user, message }) => (dispatch) => {
  if (message.users.every((item) => item._id !== user._id)) {
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: "" } });
  }
};

export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
  dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
  try {
    await postDataAPI("message", msg, auth.token);
  } catch (error) {
    dispatch({
      type: "ALERT",
      payload: { error: error.response.data.msg },
    });
  }
};

export const getConversations = (auth) => async (dispatch) => {
  try {
    const res = await postDataAPI("conversations", auth, auth.token);
    let newArr = [];

    res.data.conversations.forEach((item) => {
      item.recipients.forEach((cv) => {
        if (cv._id !== auth.user._id) {
          newArr.push({ ...cv, text: item.text });
        }
      });
    });
    dispatch({
      type: MESS_TYPES.GET_CONVERSATIONS,
      payload: { newArr, result: res.data.result },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessages = ({ auth, id }) => async (dispatch) => {
  try {
    const res = await postDataAPI(`messages/${id}`, auth, auth.token);
    dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: res.data });
  } catch (error) {
    dispatch({ type: "ALERT", payload: { error: error.response.data.msg } });
  }
};