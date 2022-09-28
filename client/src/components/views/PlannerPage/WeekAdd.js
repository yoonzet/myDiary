import React from "react";

function WeekAdd({ onSubmit, onChangeText, show }) {
  return (
    <>
      <div className={show ? "dsp_none" : "bgClick"} onClick={onSubmit}></div>
      {/* <form onSubmit={onSubmit}> */}
      <div className="add">
        <div>
          <h4>MON</h4>
          <textarea type="text" name="mon" onChange={onChangeText} />
        </div>
        <div>
          <h4>TUE</h4>{" "}
          <textarea type="text" name="tue" onChange={onChangeText} />
        </div>
        <div>
          <h4>WED</h4>{" "}
          <textarea type="text" name="wed" onChange={onChangeText} />
        </div>
        <div>
          <h4>THU</h4>{" "}
          <textarea type="text" name="thu" onChange={onChangeText} />
        </div>
        <div>
          <h4>FRI</h4>{" "}
          <textarea type="text" name="fri" onChange={onChangeText} />
        </div>
        <div>
          <h4>SAT</h4>{" "}
          <textarea type="text" name="sat" onChange={onChangeText} />
        </div>
        <div>
          <h4>SUN</h4>{" "}
          <textarea type="text" name="sun" onChange={onChangeText} />
        </div>
        {/* <button type="submit">등록</button> */}
      </div>
      {/* </form> */}
    </>
  );
}

export default WeekAdd;
