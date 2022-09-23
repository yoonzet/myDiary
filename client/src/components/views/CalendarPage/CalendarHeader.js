import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { monthReset, nextMonthIdx, preMonthIdx } from "../../../redux/calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CalendarHeader() {
  // const [monthIndex, setMonthIndex] = useState(dayjs().month());
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
      <button className="reset_btn" onClick={handleReset}>
        Today
      </button>
      <div className="arrow_btn" onClick={handleNextMonth}>
        <IoIosArrowForward />
      </div>
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
    </div>
  );
}

export default CalendarHeader;
