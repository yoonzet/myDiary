import React from "react";
import MainLayout from "../../mainLayout/MainLayout";
import Week from "./Week";

function PlannerPage() {
  return (
    <MainLayout>
      <div className="innerFrame">
        <div className="planner_wrap">
          <div className="weekly">
            <Week />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlannerPage;
