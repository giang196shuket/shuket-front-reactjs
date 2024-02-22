import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getImageBannerCoupon, getListImagesWithBarcode, getListImagesWithoutBarcode } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  bannerCouponImage:[],
  productBarcodeImage : [],
  productNoBarcodeImage : []

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
        state.bannerCouponImage = action.payload.data.list
      })
      .addCase(getListImagesWithBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productBarcodeImage = action.payload.data.list
      })
      .addCase(getListImagesWithoutBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productNoBarcodeImage = action.payload.data.list
      })
      .addMatcher(
        isAnyOf(
          getImageBannerCoupon.pending,
          getListImagesWithBarcode.pending,
          getListImagesWithoutBarcode.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getImageBannerCoupon.rejected,
          getListImagesWithBarcode.rejected,
          getListImagesWithoutBarcode.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});


export default imagesSlice.reducer;
