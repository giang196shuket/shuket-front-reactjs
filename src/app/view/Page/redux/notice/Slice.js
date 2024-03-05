import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {  getNoticeAppList, getNoticeMoaList } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[],

};

export const noticeSlice = createSlice({
  name: "notice",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNoticeMoaList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list
      })
      .addCase(getNoticeAppList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list
      })
      .addMatcher(
        isAnyOf(
          getNoticeMoaList.pending,
          getNoticeAppList.pending,
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getNoticeMoaList.rejected,
          getNoticeAppList.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
        }
      )
  },
});


export default noticeSlice.reducer;
