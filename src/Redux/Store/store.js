import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "../Reducers/contentSlice";
export const store = configureStore({
  reducer: {
    textContent: contentSlice,
  },
});
