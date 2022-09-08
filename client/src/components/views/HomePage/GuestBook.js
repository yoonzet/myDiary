import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getGuestBook, postGuestBook } from "../../../redux/guestBook";

function GuestBook() {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);
  const dispatch = useDispatch();
  const onChange = useMemo(() => {
    return (e) => {
      setText(e.target.value);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      text: text,
    };
    dispatch(postGuestBook(body));
  };

  useEffect(() => {
    axios.get("/api/guestBook").then((response) => console.log(response.data));
  }, []);

  return (
    <div className="guestBook-wrap">
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={text} />
        <button>등록</button>
      </form>
    </div>
  );
}

export default GuestBook;
