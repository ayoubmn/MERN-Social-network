import React /*, { useState }*/ from "react";
import FriendSide from "../components/chat/FriendSide";
import ParticleBackground from "../ParticleBackground";
//import ConvSide from "../components/chat/ConvSide";

const Chat = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-3 border-right px-0">
        <FriendSide />
      </div>
      <div className="col-md-9">
        
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
        <div className="msgparti">
          <ParticleBackground/>
          </div>
          <h4>Inbox</h4>
          <h6>
            If you don't see any friend, please add some friends before chating
          </h6>

        </div>
        
      </div>
      
      
    </div>
  );
};

export default Chat;
