import { createSlice } from "@reduxjs/toolkit";
// add later
const authSlice = createSlice({
  name: "auth",
  initialState: {
    balabala: false,
  },
  reducers: {
    login(state, action) {
      state.balabala = true;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
