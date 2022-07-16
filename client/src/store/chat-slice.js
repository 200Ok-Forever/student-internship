import { createSlice } from "@reduxjs/toolkit";
// add later
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sendLinkCount: 0,
  },
  reducers: {
    increment(state) {
      state.sendLinkCount += 1;
    },
  },
});
export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
