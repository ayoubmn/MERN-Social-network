import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./chat/UserCard";
const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const getData = async (data, token) => {
    const res = await axios
      .post(`/usr/searchUser?username=${data}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        console.log(users);
      })
      .catch((error) => {
        dispatch({
          type: "ALERT",
          payload: { error: error.response.data.msg },
        });
      });
    return res;
  };

  useEffect(() => {
    if (search) {
      getData(search, auth.token);
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]);
  const close = () => {
    setSearch("");
    setUsers([]);
  };
  return (
    <form className="search_form" autoComplete="off">
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        autoComplete="off"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
      </div>
      <div
        className="close_search"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={close}
      >
        &times;
      </div>
      <div className="users">
        {search !== "" &&
          users.map((user) => (
            <Link key={user._id} to={`/profile/${user._id}`}>
              <UserCard user={user} border="border" />
            </Link>
          ))}
      </div>
    </form>
  );
};

export default Search;
