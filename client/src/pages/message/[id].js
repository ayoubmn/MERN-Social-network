import React /*, { useState }*/ from "react";
import FriendSide from "../../components/chat/FriendSide";
import ConvSide from "../../components/chat/ConvSide";

const Conversation = () => {
  return (
    <div className="chat d-flex">
      <div className="col-md-4 border-right px-0">
        <FriendSide />
      </div>
      <div className="col-md-8">
        <ConvSide />
      </div>
    </div>
  );
};

export default Conversation;
