import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getProductRegisterList,
  productStockStatus,
  ViewDetail,
  searchProductImages,
  updateStatus,
  setMaxMinProduct,
  updateStockItem,
  getProductCategory,
} from "./Thunk";

const initialState = {
  isLoading: false,
  error: null,
  productRegisterList: [],
  productRegisterTotal: 0
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductRegisterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productRegisterList = action.payload.data.list;
        state.productRegisterTotal = action.payload.data.total;

      })
      .addCase(updateStockItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.productRegisterList = state.productRegisterList.map((en) =>
          en.code === data.p_code ? { ...en, min_stock: data.min_stock } : en
        );
      })
      .addCase(setMaxMinProduct.fulfilled, (state, action) => {
        const data = action.payload;
        state.productRegisterList = state.productRegisterList.map((en) =>
          en.seq === data.seq
            ? {
                ...en,
                is_pro_maxqty: data.is_pro_maxqty,
                pro_max_qty: data.pro_max_qty,
                is_pro_minqty: data.is_pro_minqty,
                pro_min_qty: data.pro_min_qty,
              }
            : en
        );
      })

      .addCase(productStockStatus.fulfilled, (state, action) => {
        const data = action.payload;
        state.productRegisterList = state.productRegisterList.map((en) =>
          en.seq === data.prd_seqs?.[0]
            ? { ...en, is_pro_stock: data.prd_stock_status }
            : en
        );
      })
      .addMatcher(
        isAnyOf(
          ViewDetail.fulfilled,
          // getProductCategory.fulfilled,
          updateStatus.fulfilled
        ),
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getProductRegisterList.pending,
          productStockStatus.pending,
          ViewDetail.pending,
          searchProductImages.pending,
          updateStatus.pending,
          setMaxMinProduct.pending,
          updateStockItem.pending,
          getProductCategory.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getProductRegisterList.rejected,
          productStockStatus.rejected,
          ViewDetail.rejected,
          searchProductImages.rejected,
          updateStatus.rejected,
          setMaxMinProduct.rejected,
          updateStockItem.rejected,
          getProductCategory.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload
        }
      );
  },
});

export default productSlice.reducer;
