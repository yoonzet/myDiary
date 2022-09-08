import axios from "axios";

const GUESTBOOK_POST = "GUESTBOOK_POST";
const GUESTBOOK_GET = "GUESTBOOK_GET";

export function postGuestBook(dataToSubmit) {
  const request = axios
    .post("/api/guestBook/post", dataToSubmit)
    .then((response) => response.data);

  return {
    type: GUESTBOOK_POST,
    payload: request,
  };
}
export function getGuestBook() {
  const request = axios.get("/api/guestBook").then((response) => response.data);

  return {
    type: GUESTBOOK_GET,
    payload: request,
  };
}
export default function guestBook_reducer(state = {}, action) {
  switch (action.type) {
    case GUESTBOOK_POST:
      return { ...state, register: action.payload };
    case GUESTBOOK_GET:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
