import { createSlice } from "@reduxjs/toolkit";
import {
  getProductRegisterList,
  productStockStatus,
  productStockStatusToOff,
  productStockStatusToOn,
  setMaxMinProduct,
  updateStockItem,
} from "./Thunk";

const initialState = {
  isLoading: false,
  error: null,
  entities: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductRegisterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list;
      })
      .addCase(updateStockItem.fulfilled, (state, action) => {
        const data = action.payload;
        state.entities = state.entities.map((en) =>
          en.code === data.p_code ? { ...en, min_stock: data.min_stock } : en
        );
      })
      .addCase(setMaxMinProduct.fulfilled, (state, action) => {
        const data = action.payload;
        state.entities = state.entities.map((en) =>
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
        state.entities = state.entities.map((en) =>
          en.seq === data.prd_seqs?.[0]
            ? { ...en, is_pro_stock: data.prd_stock_status }
            : en
        );
      })
      .addCase(getProductRegisterList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductRegisterList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
