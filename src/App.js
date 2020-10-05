import React, { useState, useEffect, lazy } from "react";
import "fontsource-roboto";
import "./App.css";
import SignUp from "./components/signUp";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Login from "./components/login";
import AllUsers from "./components/AllUsers";

//context imports
import { UseStateValue } from "./context/UserContext";
import { actionTypes } from "./context/Reducer";

function App() {
  const [{ token, user }, dispatch] = UseStateValue();

  const [tabValue, setTabValue] = useState(0);
  if (user) {
    console.log(user);
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: user.userId,
          email: user.email,
          token: token,
        })
      );
    }
  }, [user, token]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      dispatch({
        type: actionTypes.SET_USER,
        user: storedData,
      });
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="App">
      <h1 className="title">MERN Demo 🏔️</h1>
      {!!token ? (
        <AllUsers />
      ) : (
        <div className="authentication__container">
          <Paper className="authentication__tabs" elevation={1}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Paper>
          {tabValue === 0 ? <Login /> : <SignUp />}
        </div>
      )}
    </div>
  );
}

export default App;
