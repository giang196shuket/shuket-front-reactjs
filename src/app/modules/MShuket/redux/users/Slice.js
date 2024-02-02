import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getLevelList, getUserAccountList } from "./Thunk";

const initialState = {
  isLoading: false,
  error: null,
  entities: [],
  entitiesLevel: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccountList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload.data.list;
      })
      .addCase(getLevelList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entitiesLevel = action.payload.data.list;
      })
      .addMatcher(
        isAnyOf(getUserAccountList.pending, getLevelList.pending),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(getUserAccountList.rejected, getLevelList.rejected),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export default usersSlice.reducer;
