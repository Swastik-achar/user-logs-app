import axios from "axios";

export const getUsers = users => {
  return {
    type: "GET_USERS",
    payload: users
  };
};
export const startGetUsers = () => {
  return dispatch => {
    axios
      .get("/api/users")
      .then(response => {
        const users = response.data.members;
        dispatch(getUsers(users));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
