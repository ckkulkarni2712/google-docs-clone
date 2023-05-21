import { createSlice } from "@reduxjs/toolkit";
const contentSlice = createSlice({
  name: "textContent",
  initialState: {
    content: "",
    documentName: "Untitled Document",
    isLoggedIn: false,
  },
  reducers: {
    addContent(state, action) {
      state.content = action.payload;
    },
    setDocumentName(state, action) {
      state.documentName = action.payload;
    },
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});
export const { addContent, setDocumentName, setLogin } = contentSlice.actions;
export default contentSlice.reducer;
