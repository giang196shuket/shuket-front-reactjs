import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getFcmList, getFcmOptions } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[],
  fcmOptions:[]
};

export const fcmSlice = createSlice({
  name: "fcm",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFcmList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.fcm_list
      })
      .addCase(getFcmOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fcmOptions = action.payload.data.list
      })
      .addMatcher(
        isAnyOf(
          getFcmList.pending,
          getFcmOptions.pending,
        ),
        getFcmList.pending ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getFcmList.rejected,
          getFcmOptions.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default fcmSlice.reducer;
