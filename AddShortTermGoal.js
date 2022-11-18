import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddLongTermGoal from "./AddLongTermGoal";
import axios from "axios";
import { useSelector } from "react-redux";
import GoalIcon from "../Images/short-term-goals-icon.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Css/Calander.css";
// import '../Css/TaskStyle.css';
import checkIcon from "../Images/check-light-purple.svg";
import Swal from "sweetalert2";
import loaderGif from "../Images/loaderGreen.gif";
import deleteViolet from "../Images/dustbinV.svg";
import tickV from "../Images/tickV.svg";
import calcc from "../Images/calcc.png";
import loaderSpinner from "../Images/Spinner1.gif";
import moment from "moment";

const AddNewGoal = (props) => {
  const [value, onChange] = useState(new Date());
  const [valueEdit, onChangeEdit] = useState(new Date());
  const [dateError, setDateError] = useState(false);
  const [shortGoalList, setShortGoalList] = useState([]);
  const loginDataRedux = useSelector((state) => state.login.loginInfo);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [editCalander, setEditCalander] = useState(false);
  const [calanderId, setCalanderId] = useState("not");

  const [loadShortGoal, setLoadShortGoal] = useState(false);
  const [loadingShortGoalText, setLoadingShortGoalText] = useState("");

  const [calanderTime, setCalanderTime] = useState(new Date());
  const [openSalilCalandar, setOpenSalilCalandar] = useState(false);
  const [showDate, setShowDate] = useState("");

  const openMainCalandar = () => {
    setOpenSalilCalandar(true);
  };

  const clickDayCalander = (value) => {
    setOpenSalilCalandar(false);
    setCalanderTime(value);
    setShowDate(value);
  };

  // for edit purpose

  const shortGoalRef = useRef("");
  const dayRef = useRef("");
  const idRef = useRef("");

  const [mainData, setMainData] = useState({});

  let dataForLocal = { shortGoal: shortGoalRef, day: dayRef, id: idRef };

  const addShortTermGoal = (data) => {
    if (calanderTime <= new Date()) {
      setDateError(true);
    } else if (calanderTime > new Date()) {
      Swal.fire({
        text: "Please wait for a while...",
        imageUrl: loaderGif,
        showConfirmButton: false,
      });
      axios({
        method: "post",
        url: process.env.REACT_APP_SHORT_TERM_GOAL_API,
        data: {
          shortTermGoal: data.shortTermGoal,
          date: calanderTime,
          userId: loginDataRedux.userID,
          status: "pending",
          api_token: localStorage.getItem("api_token"),
        },
      })
        .then((response) => {
          setCalanderTime(new Date());
          if (response.data.msg === "_success") {
            Swal.fire({
              icon: "success",
              title: "Successfully Added",
              text: "One Short Goal is successfully added to the list",
            });
            setShowDate("");
          }
          props.setExtra(!props.extra);
        })
        .catch((err) => {
          console.log("Error is ", err);
        });
      reset();
      setDateError(false);
    }
  };

  useEffect(() => {
    setLoadShortGoal(true);
    axios
      .get(
        process.env.REACT_APP_SHORT_TERM_GOAL_API +
          "/" +
          loginDataRedux.userID +
          "?api_token=" +
          localStorage.getItem("api_token") +
          ""
      )
      .then((response) => {
        // console.log("shortGoalLIST: ", response.data);
        setLoadShortGoal(false);
        if (response === null) {
          setLoadingShortGoalText("There is some Error");
        } else if (response.data.length === 0) {
          setLoadingShortGoalText("Add your first short term goal !");
        } else {
          setLoadingShortGoalText(" ");
        }
        setShortGoalList(response.data);
      })
      .catch((err) => {
        console.log("Error is ", err);
      });

    localFunction();
  }, [props.extra]);

  let newArr = [];
  for (let i = 0; i < shortGoalList.length; i++) {
    let oneDayTime = 1000 * 60 * 60 * 24;
    newArr.push({
      shortGoal: shortGoalList[i].short_term_goal,
      dayLeft: Math.round(
        (new Date(shortGoalList[i].date) - new Date()) / oneDayTime
      ),
      listId: shortGoalList[i]._id,
      status: shortGoalList[i].status,
      date: shortGoalList[i].date,
    });
  }
  let sortedArr = [];
  sortedArr = newArr.sort((a, b) => a.dayLeft - b.dayLeft);

  //   console.log("one : ", shortGoalList);
  //   console.log("two : ", sortedArr);

  //   if (sortedArr.length !== 0) {
  //     console.log("sorted", moment(sortedArr[0].date).utc().format("MM-DD-YYYY"));
  //   }

  const goalStatus = (listId) => {
    Swal.fire({
      text: "Please wait for a while...",
      imageUrl: loaderGif,
      showConfirmButton: false,
    });
    axios({
      method: "put",
      url: process.env.REACT_APP_SHORT_TERM_GOAL_API,
      data: {
        list_id: listId,
        status: "completed",
        userId: loginDataRedux.userID,
        api_token: localStorage.getItem("api_token"),
      },
    })
      .then((response) => {
        //console.log("All_Data: ", response);
        if (response.data.msg === "_success") {
          Swal.fire({
            icon: "success",
            title: "Goal Completed",
            text: "One Short Goal is successfully Completed from the list",
          });
        }
        props.setExtra(!props.extra);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteShortGoal = (listId) => {
    Swal.fire({
      text: "Please wait for a while...",
      imageUrl: loaderGif,
      showConfirmButton: false,
    });
    axios({
      method: "delete",
      url: process.env.REACT_APP_SHORT_TERM_GOAL_API,
      data: {
        list_id: listId,
        userId: loginDataRedux.userID,
        api_token: localStorage.getItem("api_token"),
      },
    })
      .then((response) => {
        // console.log("All_Data: ", response);
        // console.log("first", response.data.msg)
        if (response.data.msg === "_success") {
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully",
            text: "One Short Goal is deleted successfully from the list",
          });
        }
        props.setExtra(!props.extra);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openCalander = (listId) => {
    // console.log("ttt: ", listId)
    setEditCalander(true);
    setCalanderId(listId);
  };

  const getShortGoalChange = (e, id) => {
    shortGoalRef.current = e.short_goal;
    dayRef.current = e.day;
    idRef.current = id;
    localStorage.setItem(
      "shortGoal" + loginDataRedux.userID,
      JSON.stringify(dataForLocal)
    );
  };

  const getShortGoalDayChange = (e, id) => {
    shortGoalRef.current = e.short_goal;
    dayRef.current = e.day;
    idRef.current = id;
    localStorage.setItem(
      "shortGoal" + loginDataRedux.userID,
      JSON.stringify(dataForLocal)
    );
    setEditCalander(false);
    setCalanderId("not");
    UpdateData(id, { short_goal: e.short_goal, day: e.day });
  };

  const UpdateData = (i, updatedummyData) => {
    if (updatedummyData.short_goal === "" || updatedummyData.day === "") {
      Swal.fire({
        icon: "warning",
        title: "Field is empty",
        text: "Field cannot be empty",
      });
    } else {
      axios({
        method: "put",
        url: process.env.REACT_APP_SHORT_TERM_GOAL_API,
        data: {
          todoID: i,
          short_goal: updatedummyData.short_goal,
          day: updatedummyData.day,
          userId: loginDataRedux.userID,
          api_token: localStorage.getItem("api_token"),
        },
      })
        .then((response) => {
          // console.log("All_Data: ", response);
          props.setExtra(!props.extra);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  function localFunction() {
    let userData = JSON.parse(
      localStorage.getItem("shortGoal" + loginDataRedux.userID)
    );
    // console.log("4545", userData);
    if (localStorage.getItem("shortGoal" + loginDataRedux.userID)) {
      shortGoalRef.current = userData.shortGoal.current;
      dayRef.current = userData.day.current;
      idRef.current = userData.id.current;
      setTimeout(() => {
        axios({
          method: "put",
          url: process.env.REACT_APP_SHORT_TERM_GOAL_API,
          data: {
            todoID: userData.id.current,
            short_goal: userData.shortGoal.current,
            day: userData.day.current,
            userId: loginDataRedux.userID,
            api_token: localStorage.getItem("api_token"),
          },
        })
          .then((response) => {
            // console.log("All_Data: ", response);
            // props.setExtra(!props.extra);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    } else {
      shortGoalRef.current = "";
      dayRef.current = "";
      idRef.current = "";
    }
    setMainData({
      shortGoal: shortGoalRef.current,
      day: dayRef.current,
      id: idRef.current,
    });
  }
  // }, [])

  return (
    <div className="AddNewGoal">
      <Row className="gx-5 px-5">
        <Col className="mx-2 py-5 purple-bg">
          <h4 className="px-4 py-4">
            Short Term Goals <img src={GoalIcon} alt="not a text" />{" "}
          </h4>
          <br />
          <Row className="mb-2">
            <Col className="col-6">
              <h5>GOALS</h5>
            </Col>
            <Col className="col-6 text-right">
              <h5>DAYS LEFT</h5>
            </Col>
          </Row>
          {/* {!loadShortGoal && <span style={{ color: "#4A4994" }}>Add your first short term goal!</span>} */}

          {loadShortGoal && (
            <img src={loaderSpinner} alt="loader" height="70px" width="60px" />
          )}
          <span style={{ color: "#474401" }}>{loadingShortGoalText}</span>

          {sortedArr.map((data, index) => {
            // console.log("kokook ", data)

            let dateInput;
            let goalStatusColor;

            if (data.dayLeft < 0) {
              dateInput = "dateInputTimeOut";
              goalStatusColor = "shortGoalTimeOut";
            } else if (data.status === "completed") {
              dateInput = "dateInput2";
              goalStatusColor = "shortGoalCompleted";
            } else {
              dateInput = "dateInput";
              goalStatusColor = "shortGoalPending";
            }

            return (
              <div
                className="DateBox"
                key={
                  data.listId === mainData.id && mainData.shortGoal !== ""
                    ? mainData.shortGoal + index
                    : data.shortGoal + index
                }
              >
                <span className="checkBox">
                  <img
                    onClick={() => goalStatus(data.listId)}
                    src={data.status === "pending" ? checkIcon : tickV}
                    alt=""
                  />
                </span>
                <div className={dateInput}>
                  <input
                    className={goalStatusColor}
                    ref={shortGoalRef}
                    defaultValue={
                      data.listId === mainData.id && mainData.shortGoal !== ""
                        ? mainData.shortGoal
                        : data.shortGoal
                    }
                    onChange={(e) =>
                      getShortGoalChange(
                        { short_goal: e.target.value, day: data.date },
                        data.listId
                      )
                    }
                    onBlur={(e) =>
                      UpdateData(data.listId, { short_goal: e.target.value })
                    }
                    type="text"
                  />
                  <span className="text-rightNN">
                    <span
                      className="whiteText"
                      onClick={() => openCalander(data.listId)}
                    >
                      {" "}
                      {data.dayLeft <= 0 ? "0" : data.dayLeft} days{" "}
                      {/* {moment(data.date).utc().format("MM-DD-YYYY")} */}
                    </span>
                    <div className="calendersecondDiv">
                      {editCalander && calanderId === data.listId && (
                        <div className="calenderDiv">
                          {" "}
                          <Calendar
                            onClickDay={(value, event) =>
                              getShortGoalDayChange(
                                { short_goal: data.shortGoal, day: value },
                                data.listId
                              )
                            }
                            onChange={onChangeEdit}
                            defaultActiveStartDate={new Date(data.date)}
                            value={valueEdit}
                          />
                          <span
                            onClick={() => setEditCalander(false)}
                            className="closeButton"
                          >
                            x
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="imgDell">
                      <img
                        className="imgDell2"
                        onClick={() => deleteShortGoal(data.listId)}
                        src={deleteViolet}
                        alt="not text"
                      />
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
          <br />

          <form onSubmit={handleSubmit(addShortTermGoal)}>
            <div
              className="goalCalender"
              style={{ display: "flex", width: "100%" }}
            >
              <input
                style={{ width: "60%" }}
                type="text"
                placeholder="Type a goal"
                {...register("shortTermGoal", { required: true })}
              />
              <div onClick={openMainCalandar} className="selectMainDate">
                {showDate === "" ? (
                  "TARGET DAY'S"
                ) : (
                  <span style={{ color: "black" }}>
                    {moment(
                      calanderTime.getMonth() +
                        1 +
                        "-" +
                        calanderTime.getDate() +
                        "-" +
                        calanderTime.getFullYear(),
                      "MM-DD-YYYY"
                    ).format("MM-DD-YYYY")}
                  </span>
                )}{" "}
                <img src={calcc} alt="calcc" />{" "}
              </div>
              <div className="calenderopenDiv">
                {openSalilCalandar && (
                  <div className="calenderDiv">
                    {" "}
                    <Calendar
                      onClickDay={(value, event) => clickDayCalander(value)}
                      onChange={onChange}
                      defaultActiveStartDate={new Date()}
                      value={value}
                    />{" "}
                    <span
                      onClick={() => setOpenSalilCalandar(false)}
                      className="closeButton"
                    >
                      x
                    </span>{" "}
                  </div>
                )}
              </div>
              <button className="goalSpace" type="submit">
                <b>+ ADD</b>
              </button>
            </div>
            {errors.shortTermGoal && (
              <span style={{ color: "red", fontSize: "12px" }}>
                * Required{" "}
              </span>
            )}
            {dateError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                *Entre a valid date
              </span>
            )}
          </form>
        </Col>

        <Col className="mx-2 py-5 skyblue-bg">
          {/* Long term goals are added from here */}
          <AddLongTermGoal extra={props.extra} setExtra={props.setExtra} />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewGoal;
