import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDiary,
  getDiary,
  postDiary,
  updateDiary,
} from "../../../redux/diary";
import moment from "moment";
import axios from "axios";

function Diary() {
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [contents, setContents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/users/auth").then((response) => setUser(response.data));
  }, []);

  const onChange = useMemo(() => {
    return (e) => {
      setText(e.target.value);
    };
  }, []);

  const onUpdateChange = (e) => {
    e.preventDefault();

    setUpdateText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      commenter: user._id,
      content: text,
      createdAt: moment().format("YYYY년 MM월 DD일"),
    };
    dispatch(postDiary(body));
    setText("");
  };

  const onUpdateSubmit = (e, _id) => {
    e.preventDefault();

    let body = {
      commenter: user._id,
      content: updateText,
      createdAt: moment().format("YYYY년 MM월 DD일"),
    };
    dispatch(updateDiary(body, contents.find((i) => i._id === _id)._id));
  };

  const onDelete = (_id) => {
    dispatch(deleteDiary(contents.find((i) => i._id === _id)._id));
  };

  useEffect(() => {
    dispatch(getDiary(user._id)).then((res) => setContents(res.payload));
  }, []);
  console.log(user._id);

  return (
    <div className="diary-wrap">
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={text} />
        <button>등록</button>
      </form>
      <div className="contents">
        <ul>
          <li>hi</li>
          {contents.map((item) => (
            <li key={item._id}>
              <form onSubmit={(e) => onUpdateSubmit(e, item._id)}>
                <input onChange={onUpdateChange} value={updateText} />
              </form>
              {item.content} / {item.createdAt}
              <button onClick={() => onDelete(item._id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Diary;
