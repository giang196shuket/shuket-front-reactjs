import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getImageBannerCoupon, getListImagesWithBarcode, getListImagesWithoutBarcode, updateBannerStatusImgs, updateMultiStatusImgs, updateStatusImgs } from "./Thunk";


const initialState = {
  isLoading: false,
  error: null,
  bannerCouponImage:[],
  productImage : [],
  productImageTotal : 0,
  productImageEdit : null,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    editProductImage: (state, action) => {
      state.productImageEdit = state.productImageEdit === action.payload ? null : action.payload;
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
        state.productImage = action.payload.data.list
        state.productImageTotal = action.payload.data.total

      })
      .addCase(getListImagesWithoutBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productImage = action.payload.data.list
        state.productImageTotal = action.payload.data.total

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

export const {editProductImage } = imagesSlice.actions;

export default imagesSlice.reducer;
