import { combineReducers } from "redux";
import user_reducer from "./user";
import diary_reducer from "./diary";

const rootReducer = combineReducers({
  user_reducer,
  diary_reducer,
});

export default rootReducer;
