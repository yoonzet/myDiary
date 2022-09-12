import React, { useEffect, useState } from "react";
import MainLayout from "../../mainLayout/MainLayout";
import {
  deleteDiary,
  getDiary,
  postDiary,
  updateDiary,
} from "../../../redux/diary";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import DiaryList from "./DiaryList";
import { IoAdd } from "react-icons/io5";
import CreateListModal from "./CreateListModal";

function DiaryPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [del, setDel] = useState("");
  const [show, setShow] = useState(false);
  const onToggle = () => {
    console.log(show ? "yes" : "no");
    setShow(!show);
  };

  useEffect(() => {
    async function userAndContents() {
      const userData = await axios.get("/api/users/auth");
      const result = await userData.data;
      setUser(result);

      const contentsData = await dispatch(getDiary(result._id));
      setContents(contentsData.payload);
    }
    userAndContents();
  }, [text, updateText, del, dispatch]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onUpdateChange = (e) => {
    e.preventDefault();

    setUpdateText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      commenter: user._id,
      content: text,
      createdAt: moment().format("YYYY년 MM월 DD일 ddd"),
    };
    dispatch(postDiary(body));
    setText("");
  };

  const onUpdateSubmit = (e, _id) => {
    e.preventDefault();

    let body = {
      commenter: user._id,
      content: updateText,
      createdAt: moment().format("YYYY년 MM월 DD일 ddd"),
    };
    dispatch(updateDiary(body, contents.find((i) => i._id === _id)._id));
  };

  const onDelete = (e, _id) => {
    if (window.confirm("삭제하시겠습니까?") == true) {
      dispatch(deleteDiary(contents.find((i) => i._id === _id)._id));
      setDel(del - 1);
    }
  };

  return (
    <MainLayout>
      <div className="innerFrame">
        <div className="diary-wrap">
          <div className="contents">
            <ul>
              <li onClick={onToggle} className="add_btn">
                <p>
                  <IoAdd />
                </p>
              </li>
              <DiaryList
                contents={contents}
                onUpdateSubmit={onUpdateSubmit}
                onUpdateChange={onUpdateChange}
                updateText={updateText}
                onDelete={onDelete}
              />
            </ul>
          </div>
          <CreateListModal
            onSubmit={onSubmit}
            onChange={onChange}
            text={text}
            show={show}
            onToggle={onToggle}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default DiaryPage;
