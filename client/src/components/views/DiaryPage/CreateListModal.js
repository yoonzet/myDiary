import React from "react";
import { useState } from "react";

function CreateListModal({ onSubmit, onChange, text }) {
  const [show, setShow] = useState(false);
  const onToggle = () => {
    console.log(show ? "yes" : "no");
    setShow(!show);
  };
  return (
    <div className={show ? "modal_bg" : "modal_bg active"}>
      <div className="modal_wrap">
        <form onSubmit={onSubmit}>
          <textarea
            onChange={onChange}
            value={text}
            placeholder="내용을 입력해 주세요"
          />
          <button onClick={onToggle}>등록</button>
        </form>
      </div>
    </div>
  );
}

export default CreateListModal;
