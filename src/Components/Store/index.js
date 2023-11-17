import { configureStore } from "@reduxjs/toolkit";
import ClassSlice from "./ClassSlice";

const Store = configureStore({
  reducer: { class: ClassSlice.reducer },
});

export default Store;
