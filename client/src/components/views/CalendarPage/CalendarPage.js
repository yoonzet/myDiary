import React, { useEffect, useState } from "react";
import MainLayout from "../../mainLayout/MainLayout";
import { getMonth } from "../../../util";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector((state) => state.calendar_reducer.monthIndex);
  // const saveCalEvents = useSelector(
  //   (state) => state.calendar_reducer.saveCalEvents
  // );
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <MainLayout>
      <>
        {showEventModal && (
          <EventModal
            setShowEventModal={setShowEventModal}
            selectedEvent={selectedEvent}
            daySelected={daySelected}
          />
        )}

        <CalendarHeader />
        <Month
          currentMonth={currentMonth}
          setShowEventModal={setShowEventModal}
          setDaySelected={setDaySelected}
          setSelectedEvent={setSelectedEvent}
        />
      </>
    </MainLayout>
  );
}

export default CalendarPage;
