import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCal, postCal, updateCal } from "../../../redux/calendar";
import { BsFillTrashFill, BsXLg } from "react-icons/bs";

function EventModal({
  setShowEventModal,
  selectedEvent,
  daySelected,
  contents,
  user,
}) {
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const dispatch = useDispatch();

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    const calEvent = {
      writer: user._id,
      title,
      description,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatch(updateCal(calEvent, contents.find((i) => i._id === _id)._id));
      // setDel(del - 1);
    } else {
      dispatch(postCal(calEvent));
    }

    setShowEventModal(false);
  };

  return (
    <div className="eventModal_wrap">
      <form>
        {/* del, 닫기버튼 */}
        <header>
          <div>
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatch(deleteCal(selectedEvent._id));
                  setShowEventModal(false);
                }}
              >
                <BsFillTrashFill />
              </button>
            )}
            <button
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <BsXLg />
            </button>
          </div>
        </header>

        <div className="contents">
          {/* 날짜표시 */}
          <p>{daySelected.format("YYYY / MM / DD (dddd)")}</p>
          {/* 타이틀 인풋 */}
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="memo"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <footer>
          <button
            type={"submit"}
            onClick={(e) => handleSubmit(e, selectedEvent._id)}
          >
            저장
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
