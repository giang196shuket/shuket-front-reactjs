import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import * as auth from "../app/view/Auth/redux/authRedux";
import { authSlice } from "../app/view/Auth/redux/authSlice";
import { martSlice } from "../app/view/Page/redux/marts/Slice";
import { mainSlice } from "../app/view/Page/redux/main/Slice";
import { fcmSlice } from "../app/view/Page/redux/fcm/Slice";
import { imagesSlice } from "../app/view/Page/redux/images/Slice";
import { productSlice } from "../app/view/Page/redux/product/Slice";
import { deliverySlice } from "../app/view/Page/redux/delivery/Slice";
import { usersSlice } from "../app/view/Page/redux/users/Slice";
import { catalogSlice } from "../app/view/Page/redux/catalog/Slice";
import { noticeSlice } from "../app/view/Page/redux/notice/Slice";
import { orderSlice } from "../app/view/Page/redux/order/Slice";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// const adminPersistConfig = {
//   ...persistCommonConfig,
//   key: 'admin',
//   whitelist: ['isLoggedIn', 'adminInfo']
// };
// const authPersistConfig = {
//   ...persistCommonConfig,
//   key: 'auth',
//   whitelist: ['authToken', 'user']
// };
const accountPersistConfig = {
  ...persistCommonConfig,
  key: "auth",
  whitelist: ["authToken", "user", "notications", "noticationsSchedule"],
};
// const authPersistConfig = {
//   ...persistCommonConfig,
//   key: 'account',
//   whitelist: ['isLoggedIn', 'auth']
// };
export const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, auth.reducer),
  marts: martSlice.reducer,
  main: mainSlice.reducer,
  auth: persistReducer(accountPersistConfig, authSlice.reducer),
  fcm: fcmSlice.reducer,
  images: imagesSlice.reducer,
  delivery: deliverySlice.reducer,
  product: productSlice.reducer,
  users: usersSlice.reducer,
  catalog: catalogSlice.reducer,
  notice: noticeSlice.reducer,
  order: orderSlice.reducer
});

export function* rootSaga() {
  // yield all([auth.saga()]);
  yield all([]);
}
