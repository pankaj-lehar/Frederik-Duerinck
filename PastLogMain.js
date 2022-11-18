import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import '../Css/TaskStyle.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import RightImage from "../Images/postlogRimg.svg";
import axios from "axios";
import moment from "moment";
import ArrowDown from "../Images/arrowDown.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/LoginPageState";
import { useHistory } from "react-router-dom";
import ReactExport from "react-data-export";

const PastLogMain = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const loginDataRedux = useSelector((state) => state.login.loginInfo);
  const dateFromRedux = useSelector((state) => state.login.dateFromPastLog);

  let todayDate = new Date();
  let sortedTodayDate = moment(
    todayDate.getMonth() +
      1 +
      "-" +
      todayDate.getDate() +
      "-" +
      todayDate.getFullYear(),
    "MM-DD-YYYY"
  ).format("MM-DD-YYYY");
  let sortedTomorrowDate = moment(
    todayDate.getMonth() +
      1 +
      "-" +
      (todayDate.getDate() + 1) +
      "-" +
      todayDate.getFullYear(),
    "MM-DD-YYYY"
  ).format("MM-DD-YYYY");

  const [value, onChange] = useState(new Date());
  const [databaseDate, setDatabaseDate] = useState([]);
  const [dailyLogPage, setTrueOrFalse] = useState(false);
  const [finalExcel, setFinalExcel] = useState([]);
  let finalExcelDataArray = [];

  useEffect(() => {
    let valueDate = moment(
      value.getMonth() + 1 + "-" + value.getDate() + "-" + value.getFullYear(),
      "MM-DD-YYYY"
    ).format("MM-DD-YYYY");
    dispatch(loginActions.mySelectedDateFromPastLog(valueDate));
    if (dailyLogPage) {
      history.push("/journal/daily-log");
      setTrueOrFalse(false);
    } else {
      setTrueOrFalse(true);
    }

    hello();
  }, [value]);

  let dayCount = [];
  for (let t = -1; t < 10; t++) {
    dayCount.push(t);
  }
  const previousDates = dayCount.map((data, index) => {
    let dates = new Date(new Date().setDate(new Date().getDate() - data));
    let datesDetail = moment(
      dates.getMonth() + 1 + "-" + dates.getDate() + "-" + dates.getFullYear(),
      "MM-DD-YYYY"
    ).format("MM-DD-YYYY");
    let listColor = "";

    for (let i = 0; i < databaseDate.length; i++) {
      if (datesDetail === databaseDate[i].todayDate) {
        listColor = "nonClickDateStyle";
        if (datesDetail === dateFromRedux) {
          listColor = "clickDateStyle";
        }
      }
    }

    return (
      <li
        value={datesDetail}
        key={index}
        className={listColor}
        onClick={() => selectDate(datesDetail)}
      >
        {datesDetail}
      </li>
    );
  });

  const selectDate = (dd) => {
    dispatch(loginActions.mySelectedDateFromPastLog(dd));
    history.push("/journal/daily-log");
  };

  function hello() {
    axios
      .get(
        process.env.REACT_APP_PASTENTRIES +
          "/" +
          loginDataRedux.userID +
          "?api_token=" +
          localStorage.getItem("api_token") +
          ""
      )
      .then((response) => {
        setDatabaseDate(response.data.geall);
      })
      .catch((err) => {
        console.log("Error is ", err);
      });
    let dateE = [];
    let dataText = [];
    axios
      .get(
        process.env.REACT_APP_EDITOR +
          "/" +
          loginDataRedux.userID +
          "?api_token=" +
          localStorage.getItem("api_token") +
          ""
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          dateE = response.data[i].todayDate;
          let uu = JSON.parse(response.data[i].editorTextData);
          for (let j = 0; j < uu.blocks.length; j++) {
            dataText = uu.blocks[j].text;
          }
          finalExcelDataArray[i] = { date: dateE, JournalEntry: dataText };
        }
        setFinalExcel(finalExcelDataArray);
      })
      .catch((err) => {
        // console.log("Error is ", err);
      });
  }

  // Date.prototype.addDays = function (days) {
  //   var date = new Date(this.valueOf());
  //   date.setDate(date.getDate() + days);
  //   return date;
  // }

  // useEffect(() => {

  //   hello();

  // }, [value]);

  let dataForExcel = [];
  for (let i = 0; i < databaseDate.length; i++) {
    dataForExcel.push({
      Start_Time: databaseDate[i].startTime,
      End_Time: databaseDate[i].endTime,
      Activity: databaseDate[i].taskDetail,
      Status: databaseDate[i].status,
      Date: databaseDate[i].todayDate,
    });
  }

  const todayClick = () => {
    dispatch(loginActions.mySelectedDateFromPastLog(sortedTodayDate));
    history.push("/journal/daily-log");
  };

  const tomorrowClick = () => {
    dispatch(loginActions.mySelectedDateFromPastLog(sortedTomorrowDate));
    history.push("/journal/daily-log");
  };

  return (
    <div>
      <Row>
        <Col lg={10}>
          <Col className="px-5">
            <h3 className="activityDate">Log History</h3>
          </Col>

          <Row className="PastLog">
            <Col lg={7} className="px-4 py-5">
              <Col className="p-3 text-center calanderBox">
                <h5>Choose a day from calander</h5>

                {/* calander is here */}
                <Calendar
                  onChange={onChange}
                  value={value}
                  // tileDisabled={({ date, view }) =>
                  //   // console.log(databaseDate, "jjjjj");
                  //   (view === 'month') && // Block day tiles only
                  //   databaseDate.every(data =>
                  //     moment((date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear(), 'MM-DD-YYYY').format('MM-DD-YYYY') !== data.todayDate
                  //   )}

                  // minDate={new Date()}

                  tileClassName={({ date, view }) => {
                    if (
                      databaseDate.every(
                        (data) =>
                          moment(
                            date.getMonth() +
                              1 +
                              "-" +
                              date.getDate() +
                              "-" +
                              date.getFullYear(),
                            "MM-DD-YYYY"
                          ).format("MM-DD-YYYY") !== data.todayDate
                      )
                    ) {
                      return "highlight";
                    }
                  }}
                />
              </Col>
            </Col>

            <Col lg={5}>
              <div className="pastlogImg">
                <img src={RightImage} alt="" />
              </div>
              <Col className="csvMainDiv">
                <div className="csvHeading">
                  <span className="arrowIcon">
                    <img
                      src={ArrowDown}
                      alt="not a text"
                      height="12px"
                      width="12px"
                    />
                  </span>
                  EXPORT ALL LOGGED JOURNALS
                </div>

                {databaseDate === null ? "No Data on this Date" : ""}

                <ExcelFile
                  element={
                    <button className="csvButton"> EXPORT AS Excel</button>
                  }
                >
                  <ExcelSheet data={dataForExcel} name="Activities Data">
                    <ExcelColumn label="Start Time" value="Start_Time" />
                    <ExcelColumn label="End Time" value="End_Time" />
                    <ExcelColumn label="Activity" value="Activity" />
                    <ExcelColumn label="Date" value="Date" />
                    <ExcelColumn label="Status" value="Status" />
                  </ExcelSheet>
                  <ExcelSheet data={finalExcel} name="Journal Entries">
                    <ExcelColumn label="Date" value="date" />
                    <ExcelColumn label="Journal Data" value="JournalEntry" />
                  </ExcelSheet>
                </ExcelFile>
              </Col>
            </Col>
          </Row>
        </Col>

        <Col className="datePadding" lg={2}>
          <div className="dateHeading" style={{ borderTopLeftRadius: "0px" }}>
            <span>PICK A DAY</span>
          </div>

          <ul className="dateList">
            <br />
            {previousDates}
            <div className="dateMenu">
              <button className="dateButton" onClick={todayClick}>
                TODAY
              </button>
              <button className="dateButton" onClick={tomorrowClick}>
                TOMORROW
              </button>
            </div>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default PastLogMain;
