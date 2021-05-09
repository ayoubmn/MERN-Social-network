import React /*, { useState }*/ from "react";
import FriendSide from "../../components/chat/FriendSide";
import ConvSide from "../../components/chat/ConvSide";

const Conversation = () => {
  return (
    <div className="messageC d-flex">
      <div className="col-md-4 border-right px-0">
        <FriendSide />
      </div>
      <div className="col-md-8 px-0">
        <ConvSide />
      </div>
    </div>
  );
};

export default Conversation;
