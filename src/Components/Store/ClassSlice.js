import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  class: false,
};

const ClassSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    classHandler(state, action) {
      state.class = true;
    },
  },
});

export const ClassActions = ClassSlice.actions;
export default ClassSlice;
