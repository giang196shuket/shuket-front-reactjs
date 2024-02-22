import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getDetailMart, moaSearchList, uploadMartLogo } from "./Thunk";

const initialMartsState = {
  listLoading: false,
  isLoading: false,
  totalCount: 0,
  entities: null,
  martForEdit: undefined,
  martHQList: [],
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const martSlice = createSlice({
  name: "marts",
  initialState: initialMartsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.isLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.isLoading = true;
      }
    },
    // getProductById
    martFetched: (state, action) => {
      console.log("martFetched", action.payload);
      state.isLoading = false;
      state.martForEdit = action.payload.martForEdit;
      state.martHQList = action.payload.martHQList;
      state.error = null;
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
      .addCase(moaSearchList.fulfilled, (state, action) => {
        state.entities = action.payload.data?.list;
        state.totalCount = action.payload.data?.total;
        state.error = null;
        state.isLoading = false;
      })

      .addMatcher(
        isAnyOf(
          uploadMartLogo.pending,
          moaSearchList.pending,
          getDetailMart.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          uploadMartLogo.rejected,
          moaSearchList.rejected,
          getDetailMart.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});
