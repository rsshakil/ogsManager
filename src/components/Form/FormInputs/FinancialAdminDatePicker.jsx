import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../store/modalState";

import { Holidays } from "../../../store/holidaysData";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";



const FinancialAdminDatePicker = ({ name, value, updateModalButtonState = () => { } }) => {
  registerLocale('ja', ja)

  const [modalStateValue, setModalState] = useRecoilState(modalState);
  // console.log('modalStateValue>>>>>>>>>', modalStateValue);
  const [holidaysStateValue, setHolidaysState] = useRecoilState(Holidays);
  // console.log("確認holidaysStateValue", holidaysStateValue)

  const [startDate, setStartDate] = useState(new Date(value * 1000))

  const handleChange = (date, e) => {
    // console.log("確認date", e)
    let unixTimeStamp = Math.floor(new Date(date).getTime());
    // console.log('name', name);
    setStartDate(unixTimeStamp)
    updateModalButtonState(false);
    setModalState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: Math.floor(unixTimeStamp / 1000)
      }
    }))

  }
  ///////////mamiya/////////////
  useEffect(() => {
    setStartDate(new Date(value * 1000))
  }, [value])


  //　祝日を赤くする
  const holidayClassName = (date, e) => {
    // console.log("確認date", date.getTime())
    var formattedDate = date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
    // console.log('formattedDate', formattedDate);
    // console.log('holidaysStateValue', holidaysStateValue);
    if (holidaysStateValue.holidays && holidaysStateValue.holidays.includes(formattedDate)) {
      // console.log('この日は祝日dateに存在します')
      return "isHoliday"
    }
  }
  return (
    <div class="fake-input">

      <img src="/calendar-icon.png" width="25" />

      <DatePicker
        type="date" id="" className="w-full cursor-pointer" aria-label="" name={name} defaultValue=""
        locale="ja"
        dateFormatCalendar="yyyy年 MM月"
        dateFormat="yyyy年MM月dd日(E)"
        selected={startDate}
        onChange={handleChange}
        onFocus={e => e.target.blur()}
        dayClassName={holidayClassName}
      />
    </div>
  )
}

export default FinancialAdminDatePicker