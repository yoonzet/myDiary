import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../mainLayout/MainLayout";
import Diary from "./Diary";

function DiaryPage() {
  return (
    <MainLayout>
      <div className="innerFrame">
        <Diary />
      </div>
    </MainLayout>
  );
}

export default DiaryPage;
