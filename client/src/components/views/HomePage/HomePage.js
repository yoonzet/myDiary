import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import Nav from "../Nav/Nav";
import ProfileBox from "./ProfileBox";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("/api/users/auth").then((response) => setUser(response.data));
  }, []);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((res) => {
      if (res.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <>
      <div className="frame_wrap">
        <div className="home_wrap">
          <ProfileBox user={user} onClickHandler={onClickHandler} />
          <div className="right_wrap"></div>
        </div>
        <Nav />
      </div>
    </>
  );
}

export default Auth(HomePage, null);
