import React from "react";
import Nav from "../views/Nav/Nav";

function MainLayout({ children }) {
  return (
    <div className="frame_wrap">
      <div className="frame">{children}</div>
      <Nav />
    </div>
  );
}

export default MainLayout;
