import { createSlice } from "@reduxjs/toolkit";
import { getImageBannerCoupon } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  entities:[]

};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImageBannerCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list_data
      })

      .addCase(
        getImageBannerCoupon.pending ,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addCase(
        getImageBannerCoupon.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default imagesSlice.reducer;
