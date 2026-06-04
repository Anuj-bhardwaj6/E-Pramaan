import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isAdmin = false;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
    clearAdmin(state) {
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser, setAdmin, clearAdmin } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;


