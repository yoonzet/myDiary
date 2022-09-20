import dayjs from "dayjs";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCal } from "../../../redux/calendar";

const Div1 = styled.div`
  border-width: 1px;
  border-color: rgb(229 231 235);
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const P1 = styled.p`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  margin-top: 0.25rem; /* 4px */
`;
const P2 = styled.p`
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  margin-top: 0.25rem; /* 4px */
  padding: 0.25rem; /* 4px */
  text-align: center;
`;
const Div2 = styled.div`
  flex: 1 1 0%;
  cursor: pointer;
`;
const Div3 = styled.div`
  padding: 0.25rem;
  margin: 0.75rem;
  color: gray;
  border-radius: 12px;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function Day({
  day,
  rowIdx,
  setShowEventModal,
  setDaySelected,
  setSelectedEvent,
}) {
  const [dayEvents, setDayEvents] = useState([]);
  const [user, setUser] = useState([]);
  const [contents, setContents] = useState([]);
  const dispatch = useDispatch();

  // 데이터 get요청
  useEffect(() => {
    async function userAndContents() {
      const userData = await axios.get("/api/users/auth");
      const result = await userData.data;
      setUser(result);

      const contentsData = await dispatch(getCal(result._id));
      setContents(contentsData.payload);
    }
    userAndContents();
  }, [dispatch]);

  // const saveCalEvents = useSelector(
  //   (state) => state.planner_reducer.saveCalEvents
  // );

  useEffect(() => {
    const events = contents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [contents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? {
          backgroundColor: "lightBlue",
          width: "1.75rem",
          borderRadius: "9999px",
        }
      : null;
  };

  return (
    <Div1>
      <Header>
        {/* 요일표시 */}
        {rowIdx === 0 && <P1>{day.format("ddd").toUpperCase()}</P1>}
        {/* 날짜표시 */}
        <P2 style={getCurrentDayClass()}>{day.format("DD")}</P2>
      </Header>
      <Div2
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((e, i) => (
          <Div3
            key={i}
            onClick={() => setSelectedEvent(e)}
            style={{ backgroundColor: "#eee" }}
          >
            {e.title}
          </Div3>
        ))}
      </Div2>
    </Div1>
  );
}

export default Day;
