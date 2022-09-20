import axios from "axios";
import dayjs from "dayjs";

// monthIndex
const PRE_MONTH_IDX = "PRE_MONTH_IDX";
const NEXT_MONTH_IDX = "NEXT_MONTH_IDX";
const MONTH_RESET = "MONTH_RESET";
// saveCalEvents
const CALENDAR_POST = "CALENDAR_POST";
const CALENDAR_GET = "CALENDAR_GET";
const CALENDAR_DEL = "CALENDAR_DEL";
const CALENDAR_UPDATE = "CALENDAR_UPDATE";

// monthIndex
export const preMonthIdx = () => ({ type: PRE_MONTH_IDX });
export const nextMonthIdx = () => ({ type: NEXT_MONTH_IDX });
export const monthReset = () => ({ type: MONTH_RESET });
// saveCalEvents
export function postCal(dataToSubmit) {
  const request = axios
    .post("/api/calendar/post", dataToSubmit)
    .then((response) => response.data);

  return { type: CALENDAR_POST, payload: request };
}
export function getCal(id) {
  const request = axios
    .get(`/api/calendar/${id}`)
    .then((response) => response.data);

  return { type: CALENDAR_GET, payload: request };
}
export function deleteCal(id) {
  const request = axios
    .delete(`/api/calendar/${id}`)
    .then((response) => response.data);

  return { type: CALENDAR_DEL, payload: request };
}
export function updateCal(dataToSubmit, id) {
  const request = axios
    .patch(`/api/calendar/${id}`, dataToSubmit)
    .then((response) => response.data);

  return { type: CALENDAR_UPDATE, payload: request };
}

const initialState = {
  monthIndex: dayjs().month(),
  saveCalEvents: {},
};

export default function planner_reducer(state = initialState, action) {
  switch (action.type) {
    // monthIndex
    case PRE_MONTH_IDX:
      return {
        ...state,
        monthIndex: state.monthIndex - 1,
      };
    case NEXT_MONTH_IDX:
      return {
        ...state,
        monthIndex: state.monthIndex + 1,
      };
    case MONTH_RESET:
      return {
        ...state,
        monthIndex:
          state === dayjs().month()
            ? (state.monthIndex = state.monthIndex + Math.random())
            : (state.monthIndex = dayjs().month()),
      };

    // saveCalEvents
    case CALENDAR_POST:
      return {
        ...state,
        saveCalEvents: action.payload,
      };
    case CALENDAR_UPDATE:
      return {
        ...state,
        saveCalEvents: action.payload,

        // saveCalEvents: state.saveCalEvents.map((e) =>
        //   e.id === action.payload.id ? action.payload : e
        // ),
      };
    case CALENDAR_DEL:
      return {
        ...state,
        saveCalEvents: action.payload,

        // saveCalEvents: state.value.filter((e) => e.id !== action.payload.id),
      };

    default:
      return state;
  }
}
