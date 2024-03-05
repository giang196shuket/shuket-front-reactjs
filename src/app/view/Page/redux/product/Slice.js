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
  updateMultiStatusPrd,
  getProductUnregisterList,
  registerProduct,
  getProductInventoryList,
  getProductPriceList,
} from "./Thunk";

const initialState = {
  isLoading: false,
  error: null,
  editProductId: undefined,
  productList: [],
  productTotal: 0,
  productMinMax: undefined,
  productStock: undefined
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    editProduct: (state, action) => {
      state.editProductId = state.editProductId === action.payload ? null : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductRegisterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data.list;
        state.productTotal = action.payload.data.total;
        state.productMinMax = action.payload.data.valueMinMax;
        state.productStock = action.payload.data.valueStock;
      })
      .addCase(getProductInventoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data.list;
        state.productTotal = action.payload.data.total;
        state.productStock = action.payload.data.valueStock;
      })
      .addCase(getProductPriceList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data.list;
        state.productTotal = action.payload.data.total;
      })
      .addCase(getProductUnregisterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data.list;
        state.productTotal = action.payload.data.total;
      })
      .addCase(updateStockItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.productList = state.productList.map((en) =>
          en.code === data.p_code ? { ...en, min_stock: data.min_stock } : en
        );
      })
      .addCase(setMaxMinProduct.fulfilled, (state, action) => {
        const data = action.payload;
        state.productList = state.productList.map((en) =>
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
        state.productList = state.productList.map((en) =>
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
          updateMultiStatusPrd.pending,
          getProductCategory.pending,
          getProductUnregisterList.pending,
          registerProduct.pending,
          getProductInventoryList.pending,
          getProductPriceList.pending
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
          getProductCategory.rejected,
          updateMultiStatusPrd.rejected,
          getProductUnregisterList.rejected,
          registerProduct.rejected,
          getProductInventoryList.rejected,
          getProductPriceList.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload
        }
      );
  },
});
export const {editProduct } = productSlice.actions;

export default productSlice.reducer;
