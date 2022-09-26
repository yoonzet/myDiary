import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDiary } from "../../../redux/diary";
import { getWeekly, postWeekly, updateWeekly } from "../../../redux/weekly";
import WeekAdd from "./WeekAdd";

function Week() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [textData, setTextData] = useState({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });
  const [editTextData, setEditTextData] = useState({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });

  const [editListId, setEditListId] = useState(null);

  const [show, setShow] = useState(false);

  // 데이터 get요청
  useEffect(() => {
    async function userAndContents() {
      const userData = await axios.get("/api/users/auth");
      const result = await userData.data;
      setUser(result);

      const contentsData = await dispatch(getWeekly(result._id));
      setContents(contentsData.payload);
    }
    userAndContents();
  }, [weekList, textData, dispatch]);

  const onChangeText = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...textData };
    newFormData[fieldName] = fieldValue;

    setTextData(newFormData);
  };
  const onEditChangeText = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editTextData };
    newFormData[fieldName] = fieldValue;

    setEditTextData(newFormData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const week = {
      id: Date.now(),
      mon: textData.mon,
      tue: textData.tue,
      wed: textData.wed,
      thu: textData.thu,
      fri: textData.fri,
      sat: textData.sat,
      sun: textData.sun,
    };

    const newWeek = [week, ...weekList];
    setWeekList(newWeek);

    let body = {
      writer: user._id,
      content: textData,
    };

    dispatch(postWeekly(body));
    setShow(!show);
  };
  const onEditSubmit = (e, _id) => {
    e.preventDefault();

    const editedList = {
      id: editListId,
      mon: editTextData.mon,
      tue: editTextData.tue,
      wed: editTextData.wed,
      thu: editTextData.thu,
      fri: editTextData.fri,
      sat: editTextData.sat,
      sun: editTextData.sun,
    };

    const newWeek = [...weekList];

    const index = weekList.findIndex((item) => item.id === editListId);

    newWeek[index] = editedList;

    setWeekList(newWeek);
    setEditListId(null);

    let body = {
      writer: user._id,
      content: editTextData,
    };

    dispatch(updateWeekly(body, contents.find((i) => i._id === _id)._id));

    setShow(!show);
  };

  const onEditClick = (e, item) => {
    e.preventDefault();
    setEditListId(item._id);

    const formValues = {
      mon: item.content.mon,
      tue: item.content.tue,
      wed: item.content.wed,
      thu: item.content.thu,
      fri: item.content.fri,
      sat: item.content.sat,
      sun: item.content.sun,
    };

    setEditTextData(formValues);
    setShow(!show);
  };

  return (
    <div className="week_wrap">
      <h3>Weekly Plan</h3>

      {contents.length !== 1 ? (
        <WeekAdd onSubmit={onSubmit} onChangeText={onChangeText} show={show} />
      ) : null}

      {contents.map((item, i) => (
        <React.Fragment key={i}>
          <div
            className={!show ? "dsp_none" : "bgClick"}
            onClick={(e) => onEditSubmit(e, item._id)}
          ></div>

          <div
            className={"readOnly"}
            onClick={(e) => {
              onEditClick(e, item);
            }}
          >
            <div>
              <h4>MON</h4>
              <p>{item.content.mon}</p>
            </div>
            <div>
              <h4>TUE</h4>
              <p>{item.content.tue}</p>
            </div>
            <div>
              <h4>WED</h4>
              <p>{item.content.wed}</p>
            </div>
            <div>
              <h4>THU</h4>
              <p>{item.content.thu}</p>
            </div>
            <div>
              <h4>FRI</h4>
              <p>{item.content.fri}</p>
            </div>
            <div>
              <h4>SAT</h4>
              <p>{item.content.sat}</p>
            </div>
            <div>
              <h4>SUN</h4>
              <p>{item.content.sun}</p>
            </div>
            {/* <button>수정하기</button> */}
          </div>

          <form onSubmit={(e) => onEditSubmit(e, item._id)}>
            <div className={!show ? "dsp_none" : "edit"}>
              <div>
                <h4>MON</h4>
                <textarea
                  type="text"
                  name="mon"
                  value={editTextData.mon}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>TUE</h4>
                <textarea
                  type="text"
                  name="tue"
                  value={editTextData.tue}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>WED</h4>
                <textarea
                  type="text"
                  name="wed"
                  value={editTextData.wed}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>THU</h4>
                <textarea
                  type="text"
                  name="thu"
                  value={editTextData.thu}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>FRI</h4>
                <textarea
                  type="text"
                  name="fri"
                  value={editTextData.fri}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>SAT</h4>
                <textarea
                  type="text"
                  name="sat"
                  value={editTextData.sat}
                  onChange={onEditChangeText}
                />
              </div>
              <div>
                <h4>SUN</h4>
                <textarea
                  type="text"
                  name="sun"
                  value={editTextData.sun}
                  onChange={onEditChangeText}
                />
              </div>
              {/* <button type="submit">수정</button> */}
            </div>
          </form>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Week;
