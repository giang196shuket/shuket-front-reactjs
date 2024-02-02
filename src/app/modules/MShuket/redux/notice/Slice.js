import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {  getNoticeAppList, getNoticeMoaList } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entitiesMoa:[],
  entitiesApp:[]

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
        state.entitiesMoa = action.payload.data.list
      })
      .addCase(getNoticeAppList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entitiesApp = action.payload.data.list
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
