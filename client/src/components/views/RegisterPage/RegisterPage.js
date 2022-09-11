import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/user";
import { useNavigate, Link } from "react-router-dom";
import Auth from "../../../hoc/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert("비밀번호를 확인해주세요.");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("회원정보를 다시 확인해주세요.");
      }
    });
  };
  return (
    <div className="Login_wrap">
      <h1 className="h1_title">Join us</h1>

      <form className="form" onSubmit={onSubmitHandler}>
        <input
          className="input
          "
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="email을 입력하세요"
        />

        <input
          className="input"
          value={Name}
          onChange={onNameHandler}
          placeholder="이름을 입력하세요"
        />

        <input
          className="input"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="비밀번호"
        />

        <input
          className="input"
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="비밀번호 확인"
        />

        <br />
        <button className="btn" type="submit">
          회원 가입
        </button>
        <div className="div_p_wrap">
          <Link to={"/login"}>
            <p>로그인</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);
