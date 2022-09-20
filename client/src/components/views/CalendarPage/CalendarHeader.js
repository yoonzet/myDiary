import dayjs from "dayjs";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { monthReset, nextMonthIdx, preMonthIdx } from "../../../redux/calendar";

const Header = styled.header`
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  margin-right: 0.5rem; /* 8px */
  width: 3rem; /* 96px */
  height: 3rem;
`;
const H1 = styled.h1`
  margin-right: 2.5rem; /* 40px */
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  color: gray;
  font-weight: bold;
`;
const Button1 = styled.button`
  cursor: pointer;
  border-width: 1px;
  border-radius: 0.25rem; /* 4px */
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
  margin-right: 1.25rem; /* 20px */
`;
const Button2 = styled.button`
  cursor: pointer;
  color: gray;
  margin-left: 0.5rem; /* 8px */
  margin-right: 0.5rem; /* 8px */
`;
const H2 = styled.h2`
  cursor: pointer;
  color: gray;
  font-weight: bold;
`;

function CalendarHeader() {
  // const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const monthIndex = useSelector((state) => state.calendar_reducer.monthIndex);
  const dispatch = useDispatch();

  console.log(monthIndex);

  const handlePrevMonth = () => {
    dispatch(preMonthIdx());
  };
  const handleNextMonth = () => {
    dispatch(nextMonthIdx());
  };
  const handleReset = () => {
    dispatch(monthReset());
  };

  return (
    <Header>
      <Img
        src="https://blog.kakaocdn.net/dn/RalzF/btqM65z5ml3/i2aJjdtXOoJhMtgX0xGHQK/img.webp"
        alt=""
      />
      <H1> Calendar</H1>
      <Button1 onClick={handleReset}>Today</Button1>
      <Button2 onClick={handlePrevMonth}>&lt;</Button2>
      <Button2 onClick={handleNextMonth}>&gt;</Button2>
      <H2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</H2>
    </Header>
  );
}

export default CalendarHeader;
