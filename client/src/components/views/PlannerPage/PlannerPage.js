import React from "react";
import MainLayout from "../../mainLayout/MainLayout";
import CheckList from "./CheckList";
import Week from "./Week";

function PlannerPage() {
  return (
    <MainLayout>
      <div className="innerFrame">
        <div className="planner_wrap">
          <CheckList />
          <div className="weekly">
            <Week />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlannerPage;
