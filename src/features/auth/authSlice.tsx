import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null | User;
  isOpened: boolean;
  isClosed: boolean;
}

const initialState: AuthState = {
  user: null,
  isOpened: false,
  isClosed: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    openLogin: (state) => {
      state.isOpened = true;
      state.isClosed = false;
    },
    openRegister: (state) => {
      state.isClosed = true;
      state.isOpened = false;
    },
  },
});

// export reducers, we will call these from our components
export const {
  login,
  logout,
  openLogin,
  openRegister,
} = authSlice.actions;

// use reducer in global store to make available throughout our application
export default authSlice.reducer;