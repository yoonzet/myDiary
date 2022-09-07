import React, { useState } from "react";
import "../../css/style.scss";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("아이디와 비밀번호을 확인해 주세요.");
      }
    });
  };

  return (
    <div className="Login_wrap">
      <h1 className="h1_title">MY WORLD</h1>
      <form className="form_login" onSubmit={onSubmit}>
        <input
          className="input_Login"
          type="email"
          placeholder="e-mail"
          onChange={onChange}
          value={email}
          name={email}
        />
        <input
          className="input_Login"
          type="password"
          placeholder="password"
          onChange={onChange}
          value={password}
          name={password}
        />
        <button className="btn_login">
          <AiOutlineUser />
          로그인
        </button>
      </form>
      <div className="div_joinWrap" type="submit">
        <p>회원가입</p>
        <p>게스트 로그인</p>
      </div>
    </div>
  );
}

export default LoginPage;
