import { BsFillTrashFill } from "react-icons/bs";

function DiaryList({
  contents,
  onUpdateSubmit,
  onUpdateChange,
  updateText,
  onDelete,
}) {
  return (
    <>
      {contents.map((item) => (
        <li className="list" key={item._id}>
          {/* <form onSubmit={(e) => onUpdateSubmit(e, item._id)}>
            <input onChange={onUpdateChange} value={updateText} />
          </form> */}

          {/* 내용 */}
          <div className="content">
            <p>{item.createdAt}</p>
            <p>{item.content}</p>
            {/* Hover시 삭제버튼 */}
            <div className="div_delBtn">
              <button onClick={(e) => onDelete(e, item._id)}>
                <BsFillTrashFill />
              </button>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default DiaryList;
