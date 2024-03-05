import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getDetailMart, getListGroupMart, getMoaMartList, updateMart, uploadMartLogo } from "./Thunk";

const initialMartsState = {
  isLoading: false,
  total: 0,
  entities: null,
  martForEdit: undefined,
  martHQList: [],
  lastError: null,
};


export const martSlice = createSlice({
  name: "marts",
  initialState: initialMartsState,
  reducers: {
    resetMartEdit: (state, action) => {
      state.martForEdit = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMartLogo.fulfilled, (state, action) => {
        state.typeMart = action.payload.data?.list_type_mart;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getDetailMart.fulfilled, (state, action) => {
        state.martForEdit = action.payload.data?.mart_info;
        state.martHQList = action.payload.data?.mart_list;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMoaMartList.fulfilled, (state, action) => {
        state.entities = action.payload.data?.list;
        state.total = action.payload.data?.total;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getListGroupMart.fulfilled, (state, action) => {
        state.martHQList = action.payload.data?.list;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          updateMart.fulfilled
        ),
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          uploadMartLogo.pending,
          getMoaMartList.pending,
          getDetailMart.pending,
          updateMart.pending,
          getListGroupMart.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          uploadMartLogo.rejected,
          getMoaMartList.rejected,
          getDetailMart.rejected,
          updateMart.rejected,
          getListGroupMart.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});
export const {resetMartEdit } = martSlice.actions;
