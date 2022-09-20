import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import saveCalEventsReducer from "./saveCalEvents";
import calendarReducer from "./calendar";
import userReducer from "./user copy";
import diaryReducer from "./diary copy";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    saveCalEvents: saveCalEventsReducer,
    calendar: calendarReducer,
    user: userReducer,
    diary: diaryReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});
