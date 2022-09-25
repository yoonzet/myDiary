import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import ProfileBox from "./ProfileBox";
import MainLayout from "../../mainLayout/MainLayout";
import { useDispatch } from "react-redux";
import { auth } from "../../../redux/user";
import Weather from "./Weather";
import SmallCal from "./SmallCal";
import News from "./News";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(auth()).then((res) => setUser(res.payload));
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
      <div className="right_wrap">
        <div className="top_wrap">
          <Weather />
          <SmallCal />
        </div>
        <News />
      </div>
    </MainLayout>
  );
}

export default Auth(HomePage, null);
