import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


//context stuff
import { UseStateValue } from "../context/UserContext";
import { actionTypes } from "../context/Reducer"

import "./AllUsers.css";

const AllUsers = () => {
  // context
  const [{ token }, dispatch] = UseStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users/allusers", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setUsersData(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        localStorage.removeItem("userData")

        dispatch({
          type: actionTypes.SET_USER,
          user: {
            token: null
          }
        })
      }
    };
    sendRequest();
  }, []);

  const errorDelete = () => {
    setError(false);
  };
  return (
    <div className="allusers__container">
      {isLoading ? (
        <div className="allusers__skeleton">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      ) : (
          <div className="allusers__elements__container">
            <Paper elevation={4} key="first" className="allusers__elements">
              <h2>All Users</h2>
            </Paper>
            {usersData.map((user) => {
              return (
                <Paper elevation={4} key={user.id} className="allusers__elements">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.id}</p>
                </Paper>
              );
            })}
          </div>
        )}
      {error ? (
        <div>
          <Chip
            label={`${error}, please try again`}
            color="secondary"
            icon={<ErrorOutlineIcon />}
            onDelete={errorDelete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
