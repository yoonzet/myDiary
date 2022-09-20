import React, { useEffect, useState } from "react";
import MainLayout from "../../mainLayout/MainLayout";
import { getMonth } from "../../../util";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCal } from "../../../redux/calendar";

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector((state) => state.calendar_reducer.monthIndex);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  }, [selectedEvent, dispatch]);

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
      <div className="innerFrame">
        <div className="calendar_wrap">
          {showEventModal && (
            <EventModal
              setShowEventModal={setShowEventModal}
              selectedEvent={selectedEvent}
              daySelected={daySelected}
              contents={contents}
              user={user}
            />
          )}

          <CalendarHeader />
          <Month
            currentMonth={currentMonth}
            setShowEventModal={setShowEventModal}
            setDaySelected={setDaySelected}
            setSelectedEvent={setSelectedEvent}
            contents={contents}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default CalendarPage;
