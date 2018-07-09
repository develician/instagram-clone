import { createAction, handleActions } from "redux-actions";

import { Map, List } from "immutable";

// action types
const CHANGE_INPUT = "account/CHANGE_INPUT";
const CHANGE_INITIAL = "account/CHANGE_INITIAL";

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const changeInitial = createAction(CHANGE_INITIAL);

// initial state
const initialState = Map({
  input: Map({
    username: "",
    name: "",
    email: "",
    password: "",
    password1: "",
    password2: ""
  })
});

// reducer
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      //   console.log(value);
      return state.setIn(["input", name], value);
    },
    [CHANGE_INITIAL]: (state, action) => {
      const { profile } = action.payload;
      const { email, username, name } = profile;
      //   console.log(email, username, name);
      return state
        .setIn(["input", "username"], username)
        .setIn(["input", "name"], name)
        .setIn(["input", "email"], email);
    }
  },
  initialState
);
