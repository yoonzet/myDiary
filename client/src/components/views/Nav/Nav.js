import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  width: 100px;
  height: 80px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f8f2e7;
  opacity: 0.7;
  margin: 7px 0;
  font-family: "GangwonEduPowerExtraBoldA";
  text-align: center;
  line-height: 80px;
  color: #e19b71;
  font-size: 20px;
  &.active {
    background-color: #f8f2e7;
    opacity: 1;
    width: 130px;
    color: #ea7c3a;
  }
`;

function Nav() {
  return (
    <div className="Nav_wrap">
      <ul className="ul_menu">
        <NavLink to={`/`} active-style="true">
          HOME
        </NavLink>
        <NavLink to="/diary" active-style="true">
          Diary
        </NavLink>
        <NavLink to="/aaa" active-style="true">
          aaa
        </NavLink>
        <NavLink to="/bbb" active-style="true">
          bbb
        </NavLink>
      </ul>
    </div>
  );
}

export default Nav;
