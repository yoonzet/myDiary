import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoAddOutline, IoTrashSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  deleteCheckList,
  getCheckList,
  postCheckList,
  updateCheckList,
} from "../../../redux/checkList";

function CheckList() {
  const [text, setText] = useState("");
  const [list, setList] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const [fake, setFake] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    async function userAndContents() {
      const userData = await axios.get("/api/users/auth");
      const result = await userData.data;
      setUser(result);

      const contentsData = await dispatch(getCheckList(result._id));
      setContents(contentsData.payload);
    }
    userAndContents();
  }, [text, isCheck, list, fake, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      writer: user._id,
      content: text,
      checked: false,
    };

    dispatch(postCheckList(body));
    setList(text);
    setText("");
  };
  const onDel = (_id) => {
    setFake(fake - 1);
    dispatch(deleteCheckList(contents.find((i) => i._id === _id)._id));
  };

  const onChecked = (_id) => {
    setIsCheck(!isCheck);
    setFake(fake - 1);

    let body = {
      writer: user._id,
      content: contents.content,
      checked: isCheck,
    };
    dispatch(updateCheckList(body, contents.find((i) => i._id === _id)._id));
  };

  return (
    <div className="checkList_wrap">
      <h3>CHECK LIST!</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          required
          placeholder="입력해주세요"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>
          <IoAddOutline />
        </button>
      </form>
      <ul>
        {contents.map((item) =>
          !item.checked ? (
            <li key={item._id}>
              <div onClick={() => onChecked(item._id)}>
                <input type="radio" defaultChecked={item.checked} />
                <span>{item.content}</span>
              </div>
              <button onClick={() => onDel(item._id)}>
                <IoTrashSharp />
              </button>
            </li>
          ) : null
        )}
      </ul>
      <ul>
        {contents.map((item) =>
          item.checked ? (
            <li key={item._id} className="list_done">
              <div onClick={() => onChecked(item._id)}>
                <input type="radio" defaultChecked={item.checked} />
                <span>{item.content}</span>
              </div>

              <button onClick={() => onDel(item._id)}>
                <IoTrashSharp />
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default CheckList;
