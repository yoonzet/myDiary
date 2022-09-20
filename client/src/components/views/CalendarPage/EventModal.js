import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCal, postCal, updateCal } from "../../../redux/calendar";

const Div1 = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  width: 25%;
`;
const Header = styled.header`
  background-color: gray;
  padding: 1rem 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Div2 = styled.div`
  padding: 0.75rem; /* 12px */
`;

const Input = styled.input`
  width: 100%;
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 0.5rem; /* 8px */
  border: 0;
  color: gray;
  &:focus {
    outline: none;
  }
`;
const Footer = styled.footer`
  display: flex;
  justify-content: end;
  width: 100%;
  border-top-width: 1px;
  padding: 0.75rem;
  margin-top: 1.25rem;
`;
const Button = styled.button`
  background-color: lightblue;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  &:hover {
    background-color: cornflowerblue;
  }
`;

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
    <Div1>
      <Form>
        {/* 드래그핸들, 닫기버튼 */}
        <Header>
          <span>drag-handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatch(deleteCal(selectedEvent._id));
                  setShowEventModal(false);
                }}
              >
                del
              </span>
            )}
            <button
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <span>x</span>
            </button>
          </div>
        </Header>

        <Div2>
          {/* 타이틀 인풋 */}
          <Input
            type="text"
            name="title"
            placeholder="add title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 날짜표시 */}
          <span>schedule</span>
          <p>{daySelected.format("dddd, MMMM DD")}</p>
          {/* 세부정보 인풋 */}
          <span>segment</span>
          <Input
            type="text"
            name="description"
            placeholder="add a description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Div2>
        <Footer>
          <Button
            type={"submit"}
            onClick={(e) => handleSubmit(e, selectedEvent._id)}
          >
            save
          </Button>
        </Footer>
      </Form>
    </Div1>
  );
}

export default EventModal;
