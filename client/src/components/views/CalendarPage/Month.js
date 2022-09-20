import React from "react";
import Day from "./Day";

function Month({
  currentMonth,
  setShowEventModal,
  setDaySelected,
  setSelectedEvent,
  contents,
}) {
  return (
    <div className="month_wrap">
      {currentMonth.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              rowIdx={i}
              setShowEventModal={setShowEventModal}
              setDaySelected={setDaySelected}
              setSelectedEvent={setSelectedEvent}
              contents={contents}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
