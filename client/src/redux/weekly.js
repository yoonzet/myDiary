import axios from "axios";

const WEEKLY_POST = "WEEKLY_POST";
const WEEKLY_GET = "WEEKLY_GET";
const WEEKLY_DELETE = "WEEKLY_DELETE";
const WEEKLY_UPDATE = "WEEKLY_UPDATE";

export function postWeekly(dataToSubmit) {
  const request = axios
    .post("/api/weekly/post", dataToSubmit)
    .then((response) => response.data);

  return {
    type: WEEKLY_POST,
    payload: request,
  };
}
export function getWeekly(id) {
  const request = axios
    .get(`/api/weekly/${id}`)
    .then((response) => response.data);

  return {
    type: WEEKLY_GET,
    payload: request,
  };
}
export function deleteWeekly(id) {
  const request = axios
    .delete(`/api/weekly/${id}`)
    .then((response) => response.data);

  return {
    type: WEEKLY_DELETE,
    payload: request,
  };
}
export function updateWeekly(dataToSubmit, id) {
  const request = axios
    .patch(`/api/weekly/${id}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: WEEKLY_UPDATE,
    payload: request,
  };
}
export default function weekly_reducer(state = {}, action) {
  switch (action.type) {
    case WEEKLY_POST:
      return { ...state, register: action.payload };
    case WEEKLY_GET:
      return { ...state, register: action.payload };
    case WEEKLY_DELETE:
      return { ...state, register: action.payload };
    case WEEKLY_UPDATE:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
