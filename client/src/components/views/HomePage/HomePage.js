import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
          {/* <SmallCal /> */}
        </div>
        <News />
        <div className="bottom_wrap">
          <div className="box_diary">
            <NavLink to="/diary">
              <div className="txt_wrap">
                <p>오늘 하루는 어떠셨나요? </p>
                <p>일상 기록하러 가기</p>
              </div>
            </NavLink>
          </div>
          <div className="box_planner">
            <NavLink to="/planner">
              <div className="txt_wrap">
                <p>목표달성을 위한 계획! </p>
                <p>플래너 바로가기</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Auth(HomePage, null);
