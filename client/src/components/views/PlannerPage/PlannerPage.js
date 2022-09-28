import dayjs from "dayjs";
import React from "react";
import MainLayout from "../../mainLayout/MainLayout";
import CheckList from "./CheckList";
import Dday from "./Dday";
import Week from "./Week";

function PlannerPage() {
  const today = dayjs().format("YYYY년 MM월 DD일 (dd)");
  return (
    <MainLayout>
      <div className="innerFrame">
        <div className="planner_wrap">
          <div className="top_wrap">
            <div className="title">
              <h1>PLANNER</h1>
              <p>{today}</p>
            </div>
            <CheckList />
            <Dday />
          </div>
          <div className="weekly">
            <Week />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlannerPage;
