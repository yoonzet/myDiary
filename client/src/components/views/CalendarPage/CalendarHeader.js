import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { monthReset, nextMonthIdx, preMonthIdx } from "../../../redux/calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CalendarHeader() {
  const monthIndex = useSelector((state) => state.calendar_reducer.monthIndex);
  const dispatch = useDispatch();

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
    <div className="calendarHeader">
      <div className="arrow_btn" onClick={handlePrevMonth}>
        <IoIosArrowBack />
      </div>
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM ")}</h2>
      <div className="arrow_btn" onClick={handleNextMonth}>
        <IoIosArrowForward />
      </div>
      <button className="reset_btn" onClick={handleReset}>
        Today
      </button>
    </div>
  );
}

export default CalendarHeader;
