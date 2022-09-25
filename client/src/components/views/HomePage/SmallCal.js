import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getMonth } from "../../../util";
import { useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function SmallCal() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector((state) => state.calendar_reducer.monthIndex);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [smallCalMonth, setSmallCalMonth] = useState(null);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getDayStyle = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return {
        fontWeight: "bold",
        color: "orange",
      };
    } else if (currDay === slcDay) {
      return {
        // padding: "0px",
        // backgroundColor: "pink",
        // borderRadius: "9999px",
        // fontWeight: "bold",
      };
    } else {
      return null;
    }
  };

  return (
    <div className="smallCal_wrap">
      <div className="hover_before">
        {/* 달/연도표시, 좌우버튼 */}
        <div className="cal_header">
          <button onClick={handlePrevMonth}>
            <IoIosArrowBack />
          </button>
          <p>
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
              "YYYY. MM"
            )}
          </p>

          <button onClick={handleNextMonth}>
            <IoIosArrowForward />
          </button>
        </div>

        <div className="cal_body">
          {/* 요일표시 */}
          {currentMonth[0].map((day, i) => (
            <span key={i}>{day.format("dd").charAt(0)}</span>
          ))}
          {/* 날짜표시 */}
          {currentMonth.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSmallCalMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  style={getDayStyle(day)}
                >
                  <span>{day.format("D")}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <NavLink to="/calendar">
        <div className="hover_after">
          <p>캘린더 바로가기</p>
        </div>
      </NavLink>
    </div>
  );
}

export default SmallCal;
