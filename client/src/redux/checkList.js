import axios from "axios";

const CHECKLIST_POST = "CHECKLIST_POST";
const CHECKLIST_GET = "CHECKLIST_GET";
const CHECKLIST_DELETE = "CHECKLIST_DELETE";
const CHECKLIST_UPDATE = "CHECKLIST_UPDATE";

export function postCheckList(dataToSubmit) {
  const request = axios
    .post("/api/checkList/post", dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHECKLIST_POST,
    payload: request,
  };
}
export function getCheckList(id) {
  const request = axios
    .get(`/api/checkList/${id}`)
    .then((response) => response.data);

  return {
    type: CHECKLIST_GET,
    payload: request,
  };
}
export function deleteCheckList(id) {
  const request = axios
    .delete(`/api/checkList/${id}`)
    .then((response) => response.data);

  return {
    type: CHECKLIST_DELETE,
    payload: request,
  };
}
export function updateCheckList(dataToSubmit, id) {
  const request = axios
    .patch(`/api/checkList/${id}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHECKLIST_UPDATE,
    payload: request,
  };
}
export default function checkList_reducer(state = {}, action) {
  switch (action.type) {
    case CHECKLIST_POST:
      return { ...state, register: action.payload };
    case CHECKLIST_GET:
      return { ...state, register: action.payload };
    case CHECKLIST_DELETE:
      return { ...state, register: action.payload };
    case CHECKLIST_UPDATE:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
