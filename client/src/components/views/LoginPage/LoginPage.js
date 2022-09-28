import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../css/style.scss";
import { loginUser } from "../../../redux/user";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Auth from "../../../hoc/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate(`/`);
      } else {
        alert("아이디와 비밀번호을 확인해 주세요.");
      }
    });
  };

  const onGuestLoginClick = () => {
    setEmail("guest@myDiary.com");
    setPassword("112233");
  };

  return (
    <div className="Login_wrap">
      <h1 className="h1_title">MY DIARY</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          type="email"
          placeholder="e-mail"
          onChange={onEmailHandler}
          value={Email}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={onPasswordHandler}
          value={Password}
        />
        <button className="btn">
          <AiOutlineUser />
          로그인
        </button>
      </form>
      <div className="div_p_wrap" type="submit">
        <Link to={"/register"}>
          <p>회원가입</p>
        </Link>
        <p onClick={onGuestLoginClick}>게스트 로그인</p>
      </div>
    </div>
  );
}

export default Auth(LoginPage, false);
