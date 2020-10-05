export const initialState = {
  user: null,
  token: null
};

export const actionTypes = {
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER"
};

const Reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        token: action.user.token
      };
    default:
      return state;
  }
};

export default Reducer;
