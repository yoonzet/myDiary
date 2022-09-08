import React from "react";

function ProfileBox({ user, onClickHandler }) {
  return (
    <div className="left_wrap">
      <div className="profile_imgBox">
        <img src={process.env.PUBLIC_URL + "/img/initial_profile.png"} alt="" />
      </div>
      <ul>
        <li>
          <h4>{user.name}</h4>
        </li>
        <li>{user.email}</li>
      </ul>
      <button className="btn_logout" onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  );
}

export default ProfileBox;
