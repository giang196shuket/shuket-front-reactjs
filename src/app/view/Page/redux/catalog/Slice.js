import { createSlice , isAnyOf } from "@reduxjs/toolkit";
import {  getListCatalog } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[]

};

export const catalogSlice = createSlice({
  name: "catelog",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCatalog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list
      })

      .addCase(
        getListCatalog.pending ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getListCatalog.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default catalogSlice.reducer;
