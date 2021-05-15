import React from "react";
import Chatgroup from "../chatgroup";
import { useParams } from "react-router-dom";

const TopicComponent = () => {
  const { id } = useParams();
  return (
    <>
      <Chatgroup topic={id} />
    </>
  );
};

export default TopicComponent;
