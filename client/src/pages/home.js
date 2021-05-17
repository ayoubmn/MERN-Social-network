import React from "react";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";
import Search from "../components/home/Search";
import FriendRequests from "../components/home/FriendRequests";

const Home = () => {
  const topics = ["sport", "politics", "arts", "gaming", "technology", "fun"];
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-sm-3">
        <div className="chatByTopic bg-light">
          <div className="item">
            <h4>Public chat</h4>
            <p>choose a topic to talk about it</p>
          </div>
          {topics.map((value) => (
            <div className="item" key={value}>
              <a
                href={"/chatgroupebytopic/" + value}
                style={{ textDecoration: "none" }}
              >
                <div className="topicCard bg-dark">{value}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-6">
        <Status />
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="col-sm-2">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Search className="item" />
          <FriendRequests className="item" style={{ position: "relative" }} />
        </div>
      </div>

    </div>
  );
};

export default Home;
