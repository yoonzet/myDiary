import React from "react";
import Day from "./Day";
import styled from "styled-components";

const DivA = styled.div`
  flex: 1 1 0%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
`;

function Month({
  currentMonth,
  setShowEventModal,
  setDaySelected,
  setSelectedEvent,
}) {
  return (
    <DivA>
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
            />
          ))}
        </React.Fragment>
      ))}
    </DivA>
  );
}

export default Month;
