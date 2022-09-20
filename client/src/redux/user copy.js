import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: { value: {} },
  reducers: {
    setLoginUser: (state, action) => {
      state.value = action.payload;
    },
    setRegisterUser: (state, action) => {
      state.value = action.payload;
    },
    setAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoginUser, setRegisterUser, setAuth } = userSlice.actions;

export const loginUser = (dataToSubmit) => {
  return async (dispatch) => {
    axios.post("/api/users/login", dataToSubmit).then((res) => {
      dispatch(setLoginUser(res.data));
    });
  };
};
export const registerUser = (dataToSubmit) => {
  return async (dispatch) => {
    axios.post("/api/users/register", dataToSubmit).then((res) => {
      dispatch(setRegisterUser(res.data));
    });
  };
};
export const auth = () => {
  return async (dispatch) => {
    axios.get("/api/users/auth").then((res) => {
      dispatch(setAuth(res.data));
    });
  };
};

export default userSlice.reducer;
