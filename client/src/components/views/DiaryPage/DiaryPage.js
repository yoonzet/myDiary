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

function DiaryPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState({
    edit: "",
  });
  const [editListId, setEditListId] = useState(null);

  const [del, setDel] = useState("");

  const [show, setShow] = useState(false);
  const onToggle = () => setShow(!show);

  // 데이터 get요청
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

  const onUpdateChange = (e) => {
    e.preventDefault();
    // const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    // const newFormData = { ...updateText };
    // newFormData[fieldName] = fieldValue;

    setUpdateText(fieldValue);
  };

  const onUpdateSubmit = (e, _id) => {
    e.preventDefault();

    let body = {
      commenter: user._id,
      content: updateText,
      createdAt: moment().format("YYYY년 MM월 DD일 ddd"),
    };
    dispatch(updateDiary(body, contents.find((i) => i._id === _id)._id));
    setDel(del - 1);
    setEditListId(null);
  };

  const onDelete = (_id) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(deleteDiary(contents.find((i) => i._id === _id)._id));
      setDel(del - 1);
    }
  };

  const onEditClick = (e, item) => {
    e.preventDefault();
    setEditListId(item._id);
    const value = item.content;
    setUpdateText(value);
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
              {contents.map((item) => (
                <DiaryList
                  key={item._id}
                  contents={contents}
                  item={item}
                  onUpdateSubmit={onUpdateSubmit}
                  onUpdateChange={onUpdateChange}
                  updateText={updateText}
                  onDelete={onDelete}
                  onEditClick={onEditClick}
                  onToggle={onToggle}
                />
              ))}
            </ul>
          </div>

          {/* 등록 모달 */}
          <div>
            <div
              className={show ? "modal_bg" : "dsp_none"}
              onClick={onToggle}
            ></div>
            <div className={show ? "modal_wrap" : "dsp_none"}>
              <form onSubmit={onSubmit}>
                <textarea
                  onChange={onChange}
                  value={text}
                  placeholder="내용을 입력해 주세요"
                />
                <div className="btn_wrap">
                  <button
                    className={text.length === 0 ? "dsp_none" : "modal_btn"}
                    onClick={onToggle}
                  >
                    등록
                  </button>
                  <div className="modal_btn del_btn" onClick={onToggle}>
                    취소
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DiaryPage;
