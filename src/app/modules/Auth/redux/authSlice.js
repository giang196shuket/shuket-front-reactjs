import { createSlice, current } from "@reduxjs/toolkit";
import {
  actionLoginAccount,
  actionLogoutAccount,
  resetAccount,
  userSwitchAccount,
} from "./authThunk";

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  notications: [],
  noticationsSchedule: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    updateMenu: (state, action) => {
      state.user =
        state.user === undefined
          ? undefined
          : { ...state.user, menu_list: action.payload };
    },
    logoutAccount: (state, action) => {
      state.authToken = undefined;
      state.user = undefined;
      state.notications = [];
      state.noticationsSchedule = [];
    },
    fetchNotifcationSchedule: (state, action) => {
      const noticationsSchedule = current(state.noticationsSchedule).filter(
        (x) => new Date().getTime() >= new Date(x.schedule).getTime()
      );
      state.noticationsSchedule = current(state.noticationsSchedule).filter(
        (x) => new Date().getTime() < new Date(x.schedule).getTime()
      );
      state.notications = current(state.notications).concat(
        noticationsSchedule
      );
    },
    addNotication: (state, action) => {
      if (action.payload.schedule !== "") {
        if (
          new Date().getTime() >= new Date(action.payload.schedule).getTime()
        ) {
          state.notications = [
            ...state.notications,
            { ...action.payload, time: new Date() },
          ];
        } else {
          state.noticationsSchedule = [
            ...state.noticationsSchedule,
            { ...action.payload, time: new Date(action.payload.schedule) },
          ];
        }
      } else {
        state.notications = [
          ...state.notications,
          { ...action.payload, time: new Date() },
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionLoginAccount.fulfilled, (state, action) => {
        state.authToken = action.payload.data?.token;
        state.user = action.payload.data;
      })
      .addCase(userSwitchAccount.fulfilled, (state, action) => {
        state.authToken = action.payload.data?.token;
        state.user = action.payload.data;
      })
      .addCase(resetAccount.fulfilled, (state, action) => {
        state.authToken = action.payload.data?.token;
        state.user = action.payload.data;
      })
      .addCase(actionLogoutAccount.fulfilled, (state, action) => {
        state.authToken = undefined;
        state.user = undefined;
      });
  },
});
export const {
  updateMenu,
  logoutAccount,
  addNotication,
  fetchNotifcationSchedule,
} = authSlice.actions;

export default authSlice.reducer;
