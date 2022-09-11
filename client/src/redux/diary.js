import axios from "axios";

const DIARY_POST = "DIARY_POST";
const DIARY_GET = "DIARY_GET";
const DIARY_DELETE = "DIARY_DELETE";
const DIARY_UPDATE = "DIARY_UPDATE";

export function postDiary(dataToSubmit) {
  const request = axios
    .post("/api/diary/post", dataToSubmit)
    .then((response) => response.data);

  return {
    type: DIARY_POST,
    payload: request,
  };
}
export function getDiary(id) {
  const request = axios
    .get(`/api/diary/${id}`)
    .then((response) => response.data);

  return {
    type: DIARY_GET,
    payload: request,
  };
}
export function deleteDiary(id) {
  const request = axios
    .delete(`/api/diary/${id}`)
    .then((response) => response.data);

  return {
    type: DIARY_DELETE,
    payload: request,
  };
}
export function updateDiary(dataToSubmit, id) {
  const request = axios
    .patch(`/api/diary/${id}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DIARY_UPDATE,
    payload: request,
  };
}
export default function diary_reducer(state = {}, action) {
  switch (action.type) {
    case DIARY_POST:
      return { ...state, register: action.payload };
    case DIARY_GET:
      return { ...state, register: action.payload };
    case DIARY_DELETE:
      return { ...state, register: action.payload };
    case DIARY_UPDATE:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
