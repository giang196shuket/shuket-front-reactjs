import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTypeMart } from "./Thunk.js";
import { getCityOptions } from "./Thunk.js";
import { getDistrictOptions } from "./Thunk.js";
import { getMartCommonWhere } from "./Thunk.js";
import { getPosOptions } from "./Thunk.js";
import { getPartnerOptions } from "./Thunk.js";
import { getPartnerSalesTeamOptions } from "./Thunk.js";

const initialState = {
  isLoading: false,
  error: null,
  typeMart: [],
  city: [],
  pos:[],
  partner:[],
  dbConnect:[],
  district: [],

};

export const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    rejectedCall: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    pendingCall: (state, action) => {
      state.error = null;
      state.isLoading = true;
    },
    fulfilledCall: (state, action) => {
      state.error = null;
      state.isLoading = false;
    },
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypeMart.fulfilled, (state, action) => {
        state.typeMart = action.payload.data.list_type_mart;
        state.isLoading = false;
      })
      .addCase(getCityOptions.fulfilled, (state, action) => {
        state.city = action.payload.data.list_cities;
        state.isLoading = false;
      })
      .addCase(getPosOptions.fulfilled, (state, action) => {
        state.pos = action.payload.data.list_pos;
        state.isLoading = false;
      })
      .addCase(getPartnerOptions.fulfilled, (state, action) => {
        state.partner = action.payload.data.list_partners;
        state.isLoading = false;
      })
      .addCase(getMartCommonWhere.fulfilled, (state, action) => {
        state.dbConnect = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getDistrictOptions.fulfilled, (state, action) => {
        state.district = action.payload.data.list_districts;
        state.isLoading = false;
      })
      .addCase(getPartnerSalesTeamOptions.fulfilled , (state, action) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(   getTypeMart.pending,
          getCityOptions.pending,
          getDistrictOptions.pending,
          getMartCommonWhere.pending,
          getPosOptions.pending,
          getPartnerOptions.pending ,
          getPartnerSalesTeamOptions.pending) ,
        (state, action) => {
          state.isLoading = true;
        }
      )
  
      .addMatcher(
        isAnyOf(   getTypeMart.rejected,
          getCityOptions.rejected,
          getDistrictOptions.rejected,
          getMartCommonWhere.pending,
          getPosOptions.rejected,
          getPartnerOptions.rejected ,
          getPartnerSalesTeamOptions.rejected) ,
        (state, action) => {
          state.isLoading = false;
        }
      )
  },
});

export const { rejectedCall, fulfilledCall, pendingCall } = mainSlice.actions;

export default mainSlice.reducer;
