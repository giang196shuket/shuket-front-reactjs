import { createSlice } from "@reduxjs/toolkit";
import { getFcmList } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[]

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

      .addCase(
        getFcmList.pending ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getFcmList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default fcmSlice.reducer;
