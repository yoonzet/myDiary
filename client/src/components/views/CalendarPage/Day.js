import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";

function Day({
  day,
  rowIdx,
  setShowEventModal,
  setDaySelected,
  setSelectedEvent,
  contents,
}) {
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = contents.filter(
      (e) => dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [contents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? {
          backgroundColor: "orange",
          width: "1.3rem",
          // height: "1.7rem",
          borderRadius: "9999px",
          color: "#fff",
          fontWeight: "bold",
        }
      : null;
  };

  return (
    <div className="day_wrap">
      <header className="header">
        {/* 요일표시 */}
        {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
        {/* 날짜표시 */}
        <p style={getCurrentDayClass()}>{day.format("DD")}</p>
      </header>
      <div
        className="day"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((e, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(e)}
            style={{ backgroundColor: "#eee" }}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
