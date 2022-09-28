import axios from "axios";

const D_DAY_POST = "D_DAY_POST";
const D_DAY_GET = "D_DAY_GET";
const D_DAY_DELETE = "D_DAY_DELETE";
const D_DAY_UPDATE = "D_DAY_UPDATE";

export function postDday(dataToSubmit) {
  const request = axios
    .post("/api/dDay/post", dataToSubmit)
    .then((response) => response.data);

  return {
    type: D_DAY_POST,
    payload: request,
  };
}
export function getDday(id) {
  const request = axios
    .get(`/api/dDay/${id}`)
    .then((response) => response.data);

  return {
    type: D_DAY_GET,
    payload: request,
  };
}
export function deleteDday(id) {
  const request = axios
    .delete(`/api/dDay/${id}`)
    .then((response) => response.data);

  return {
    type: D_DAY_DELETE,
    payload: request,
  };
}
export function updateDday(dataToSubmit, id) {
  const request = axios
    .patch(`/api/dDay/${id}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: D_DAY_UPDATE,
    payload: request,
  };
}
export default function dDay_reducer(state = {}, action) {
  switch (action.type) {
    case D_DAY_POST:
      return { ...state, register: action.payload };
    case D_DAY_GET:
      return { ...state, register: action.payload };
    case D_DAY_DELETE:
      return { ...state, register: action.payload };
    case D_DAY_UPDATE:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
