import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [socket, auth.user._id]);

  return <></>;
};

export default SocketClient;
