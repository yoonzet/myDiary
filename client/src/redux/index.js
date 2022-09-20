import { combineReducers } from "redux";
import user_reducer from "./user";
import diary_reducer from "./diary";
import calendar_reducer from "./calendar";

const rootReducer = combineReducers({
  user_reducer,
  diary_reducer,
  calendar_reducer,
});

export default rootReducer;
