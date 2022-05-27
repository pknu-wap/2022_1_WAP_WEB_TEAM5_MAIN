import React, { useState, useEffect } from "react";
import "./InputForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

function InputForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [dateInfo, setDateInfo] = useState({
    year: startDate.getFullYear(),
    month: startDate.getMonth(),
    date: startDate.getDate(),
    hour: startDate.getHours(),
    min: startDate.getMinutes(),
  });
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [category, setCategory] = useState("etc"); // set default data

  useEffect(() => {
    setDateInfo({
      year: startDate.getFullYear(),
      month: (startDate.getMonth() + 1),
      date: startDate.getDate(),
      hour: startDate.getHours(),
      min: startDate.getMinutes(),
    });
    console.log(dateInfo);
  }, [startDate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let body = {
      //날짜,카테고리,제목,내용
      date: dateInfo,
      category: category,
      title: title,
      textArea: textArea,
    };
    console.log(`front calendar post body = ${body}`);

    axios.post("/api/calendar/post", body).then((res) => {
      if (res.data.calPostSuccess) {
        alert("일정이 등록되었습니다.");
        window.location.reload();
      } else {
        alert("오류가 발생했습니다. 관리자에게 문의하세요.");
      }
    });
  };
  const onCategoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };
  const onTitleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onTextAreaHandler = (e) => {
    e.preventDefault();
    setTextArea(e.target.value);
  };
  return (
    <div>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <label>Date</label>
        <DatePicker
          selected={startDate}
          showTimeSelect
          dateFormat="Pp"
          onChange={(date) => {
            console.log(date);
            setStartDate(date);
          }}
        />
        <select onChange={onCategoryHandler}>
          <option value="etc">Etc</option>
          <option value="work out">Work out</option>
          <option value="jogging">Jogging</option>
          <option value="study">Study</option>
        </select>
        <label>Title</label>
        <input
          type="text"
          placeholder=" 7자 이내로 간단하게 입력하세요."
          onChange={onTitleHandler}
        />
        <label>Content</label>
        <textarea type="text" onChange={onTextAreaHandler} />
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default InputForm;
