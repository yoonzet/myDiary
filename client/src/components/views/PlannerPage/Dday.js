import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoAddOutline, IoTrashSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteDday, getDday, postDday } from "../../../redux/dDay";

function Dday() {
  const [inputs, setInputs] = useState({
    title: "",
    date: "",
  });
  const { title, date } = inputs;
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const [fake, setFake] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function userAndContents() {
      const userData = await axios.get("/api/users/auth");
      const result = await userData.data;
      setUser(result);

      const contentsData = await dispatch(getDday(result._id));
      setContents(contentsData.payload);
    }
    userAndContents();
  }, [inputs, fake, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = (e) => {
    const today = dayjs();
    const leftDay = dayjs(date, "YYYY-MM-DD");
    const result = Math.ceil((today - leftDay) / (1000 * 60 * 60 * 24) - 1);

    e.preventDefault();

    let body = {
      writer: user._id,
      title,
      date: dayjs(date).format("YY. MM. DD"),
      dDAy: result,
    };

    dispatch(postDday(body));
    setInputs({
      title: "",
      date: "",
    });
  };

  const onDel = (_id) => {
    setFake(fake - 1);
    dispatch(deleteDday(contents.find((i) => i._id === _id)._id));
  };

  return (
    <div className="Dday_wrap">
      <h3>D-DAY</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          name="title"
          value={title}
          placeholder="title"
          required
        />
        <input
          type="date"
          onChange={onChange}
          name="date"
          value={date}
          required
        />
        <button type="submit">
          <IoAddOutline />
        </button>
      </form>
      <ul>
        {contents.map((item) => (
          <li key={item._id}>
            <div className="mainList">
              <h3>{item.title}</h3>
              <h3>
                {item.dDAy === 0
                  ? "D-DAY"
                  : (item.dDAy > 0 ? "D+" : "D") + item.dDAy}
              </h3>
            </div>
            <div className="hover">
              <p>{item.date}</p>
              <button onClick={() => onDel(item._id)}>
                <IoTrashSharp />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dday;
