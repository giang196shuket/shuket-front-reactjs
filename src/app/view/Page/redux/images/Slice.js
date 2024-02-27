import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getImageBannerCoupon, getListImagesWithBarcode, getListImagesWithoutBarcode, updateBannerStatusImgs, updateMultiStatusImgs, updateStatusImgs } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  bannerCouponImage:[],
  productBarcodeImage : [],
  productBarcodeImageTotal : 0,
  productBarcodeImageEdit : null,
  productNoBarcodeImage : [],
  productNoBarcodeImageEdit: null,
  productNoBarcodeImageTotal : 0,

};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    editProductBarcodeImage: (state, action) => {
      state.productBarcodeImageEdit = state.productBarcodeImageEdit === action.payload ? null : action.payload;
    },
    editProductNoBarcodeImage: (state, action) => {
      state.productNoBarcodeImageEdit = state.productNoBarcodeImageEdit === action.payload ? null : action.payload;
    },
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
        state.productBarcodeImageTotal = action.payload.data.total

      })
      .addCase(getListImagesWithoutBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productNoBarcodeImage = action.payload.data.list
        state.productNoBarcodeImageTotal = action.payload.data.total

      })
      .addMatcher(
        isAnyOf(
          getImageBannerCoupon.pending,
          getListImagesWithBarcode.pending,
          getListImagesWithoutBarcode.pending,
          updateStatusImgs.pending,
          updateMultiStatusImgs.pending,
          updateBannerStatusImgs.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getImageBannerCoupon.rejected,
          getListImagesWithBarcode.rejected,
          getListImagesWithoutBarcode.rejected,
          updateStatusImgs.rejected,
          updateMultiStatusImgs.rejected,
          updateBannerStatusImgs.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {editProductBarcodeImage, editProductNoBarcodeImage } = imagesSlice.actions;

export default imagesSlice.reducer;
