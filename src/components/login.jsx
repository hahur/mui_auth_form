import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { useForm } from "react-hook-form";

//context stuff
import { actionTypes } from "../context/Reducer";
import { UseStateValue } from "../context/UserContext"

import "./login.css";

function Login() {
  //context setup
  const [{ user }, dispatch] = UseStateValue()

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errorDelete = () => {
    setError("");
  };

  const signUpSubmit = async (data, e) => {
    setLoading(true);
    errorDelete();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch({
        type: actionTypes.SET_USER,
        user: responseData.user
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      e.target.reset();
    }
  };
  return (
    <div className="signup">
      <Card className="signup__card">
        <h2>Login</h2>
        <form className="signup__form" onSubmit={handleSubmit(signUpSubmit)}>
          <TextField
            error={!!errors.email}
            helperText={
              errors.email ? "Enter a valid email address" : "required"
            }
            id="outlined-email"
            label="E-mail"
            inputRef={register({
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            name="email"
          />
          <TextField
            error={!!errors.password}
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            inputRef={register({
              required: true,
              minLength: 6,
            })}
            name="password"
            helperText={
              errors.password
                ? "Password less than 6 characters"
                : "minimun length - 6"
            }
          />
          {loading ? <LinearProgress /> : null}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>

          {error ? (
            <div>
              <Chip
                label={error.message}
                color="secondary"
                icon={<ErrorOutlineIcon />}
                onDelete={errorDelete}
              />
            </div>
          ) : null}
        </form>
      </Card>
    </div>
  );
}

export default Login;
