import React, { useRef, useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Col, Row, Container } from "react-bootstrap";
// import '../Css/Todo.css';
import axios from "axios";
// import Swal from 'sweetalert2';
import Home from "../Dashboard/Home";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/LoginPageState";
import Hamburgermenu from "../Images/hamburger menu.png";
import LogoIcon from "../Images/loggo.png";
import imggg from "../Images/background.png";
import LoginForm from "./LoginForm";
import LoginFormRouter from "./LoginFormRouter";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();

  const selectedImage = useSelector((state) => state.colorTheme.imagee);
  const loginState = useSelector((state) => state.login.loginState);

  //useref for login instant value
  const loginRef = useRef(false);
  const [data, setData] = useState({});
  const finalStatus = useRef("");

  const fbResponse = useRef();

  //facebook callback response function
  const responseFacebook = (response) => {
    if (response.status !== "unknown") {
      dispatch(loginActions.myLoginRoutingStatus(true));
      dispatch(loginActions.myLoginInfo(response));
      fbResponse.current = response;
      setData(response);

      let conStatus;
      let connectionStatus = sessionStorage.getItem(
        "fbssls_" + process.env.REACT_APP_FB_APP_ID
      );
      if (connectionStatus) {
        let mee = connectionStatus.split(",");
        conStatus = mee[6].split(":");
        finalStatus.current = conStatus[1].replace(/['"]+/g, "");
      }

      if (finalStatus.current === "connected") {
        // setLogin(true);
        dispatch(loginActions.myLoginState(true));
        localStorage.setItem("fbLogin", true);
        loginRef.current = true;
        window.FB.api(
          "/me?fields=id,first_name,last_name,email",
          function (response) {
            if (response && !response.error) {
              // / handle the result /
              profileInfo = response;
              if (response !== "" && response !== "undefined") {
                getToken(
                  profileInfo,
                  process.env.REACT_APP_LOGIN_PROFILE_DETAILS_API
                );
              }
            }
          }
        );
        //call the api function to execute
      }
    }
  };

  // send the data using api to the DB
  let profileInfo;
  const getToken = async (profileInfo, url) => {
    localStorage.removeItem("user_role");
    await axios({
      method: "post",
      url: url,
      data: {
        first_name: profileInfo.first_name,
        last_name: profileInfo.last_name,
        full_name: fbResponse.current.name,
        // profile_img_link: fbResponse.current.picture.data.url,
        access_token: fbResponse.current.accessToken,
        UserID: fbResponse.current.userID,
        Provider: fbResponse.current.graphDomain,
        Email: profileInfo.email
          ? profileInfo.email
          : fbResponse.current.userID,
        Status: finalStatus.current,
      },
    })
      .then((response) => {
        // console.log("abcddd",response);
        if (response.status === 200 && response.data.msg === "_success") {
          localStorage.setItem("api_token", response.data.token);
          localStorage.setItem("user_role", response.data.R);
        }
      })
      .catch((err) => {
        console.log(err);
        // Swal.fire({
        //   title: "Error!",
        //   html: err + " Try again",
        //   icon: "warning",
        //   confirmButtonText: "OK"
        // });
      });
  };

  let fbLoginStatus = localStorage.getItem("fbLogin");

  return (
    <div>
      {loginState ? (
        <Home data={data} />
      ) : (
        <div
          className="bgImg"
          style={
            selectedImage
              ? {
                  backgroundImage: `url(${selectedImage})`,
                  height: "100%",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundAttachment: "fixed",
                  minHeight: "100vh",
                }
              : { backgroundImage: `url(${imggg})` }
          }
        >
          <Container fluid className="px-5 ">
            <Row style={{ lineHeight: "50px" }}>
              <Col lg={3} xs={9}>
                <div className="siteLogo">
                  <div>
                    <img src={LogoIcon} alt="This is a not a text" />
                  </div>
                  <div>
                    <h1>
                      GrowFrom
                      <br /> <span>Accelerate Your Professional Journey</span>
                    </h1>
                  </div>
                </div>
              </Col>
              <Col lg={{ offset: 8, span: 1 }} xs={3}>
                <img
                  className="hamburgerMenuIcon"
                  src={Hamburgermenu}
                  alt="This is a not a text"
                />
              </Col>
            </Row>

            <div className={`App ${loginState ? "hide" : ""}`}>
              <Col
                style={
                  fbLoginStatus === "true"
                    ? { visibility: "hidden" }
                    : { visibility: "none" }
                }
              >
                <Row className="facebookLoginDiv">
                  <Col lg={6} sm={12} xs={12}>
                    <h3>Login through Facebook</h3>

                    {localStorage.getItem("fbLogin") === "true" ? (
                      <FacebookLogin
                        appId={process.env.REACT_APP_FB_APP_ID}
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        cookie={true}
                        isMobile={true}
                        icon="fa-facebook"
                      />
                    ) : (
                      <FacebookLogin
                        appId={process.env.REACT_APP_FB_APP_ID}
                        // autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        // cookie={true}
                        isMobile={true}
                        icon="fa-facebook"
                      />
                    )}
                  </Col>
                  <Col lg={6} sm={12} xs={12}>
                    {/* <LoginForm /> */}

                    <LoginFormRouter />
                  </Col>
                </Row>
              </Col>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
export default Login;
