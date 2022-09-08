import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav_wrap">
      <ul className="ul_menu">
        <Link to={"/"}>
          <li>HOME </li>
        </Link>
        <Link to={"/diary"}>
          <li>Diary </li>
        </Link>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Nav;
