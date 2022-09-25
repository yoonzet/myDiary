import { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

function DiaryList({
  contents,
  item,
  onUpdateSubmit,
  onUpdateChange,
  updateText,
  onEditClick,
  onDelete,
}) {
  const [show, setShow] = useState(false);
  const onToggle = () => setShow(!show);
  return (
    <>
      <li className="list" key={item._id}>
        <div>
          {/* 내용 */}
          <pre className="content">
            <p>{item.createdAt}</p>
            <p>{item.content}</p>
          </pre>

          <div className="out_btn_wrap">
            {/* edit버튼 */}
            <button
              onClick={(e) => {
                onEditClick(e, item);
                onToggle();
              }}
            >
              <BsFillPencilFill />
            </button>

            {/* 삭제버튼 */}
            <button onClick={() => onDelete(item._id)}>
              <BsFillTrashFill />
            </button>
          </div>

          {/* edit모드 */}
          <div
            className={show ? "edit_modal_bg" : "dsp_none"}
            onClick={onToggle}
          ></div>
          <div className={show ? "edit_modal_wrap" : "dsp_none"}>
            <form onSubmit={(e) => onUpdateSubmit(e, item._id)}>
              <textarea
                className={show ? "" : "dsp_none"}
                onChange={onUpdateChange}
                value={updateText}
                name="edit"
              />
              <div className="btn_wrap">
                <button onClick={onToggle}>완료</button>
                <button type="reset" onClick={onToggle}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </li>
    </>
  );
}

export default DiaryList;
