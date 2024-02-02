import { createSlice } from "@reduxjs/toolkit";
import { getOrderList } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[]

};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list
      })

      .addCase(
        getOrderList.pending ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getOrderList.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default orderSlice.reducer;
