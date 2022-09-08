import { combineReducers } from "redux";
import user_reducer from "./user";
import guestBook_reducer from "./guestBook";

const rootReducer = combineReducers({
  user_reducer,
  guestBook_reducer,
});

export default rootReducer;
