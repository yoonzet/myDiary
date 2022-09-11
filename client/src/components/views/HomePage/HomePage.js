import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import ProfileBox from "./ProfileBox";
import MainLayout from "../../mainLayout/MainLayout";

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
    <MainLayout>
      <ProfileBox user={user} onClickHandler={onClickHandler} />
      <div className="right_wrap"></div>
    </MainLayout>
  );
}

export default Auth(HomePage, null);
