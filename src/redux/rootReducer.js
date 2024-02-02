import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import * as auth from "../app/modules/Auth/redux/authRedux";
import { authSlice } from "../app/modules/Auth/redux/authSlice";
import { martSlice } from "../app/modules/MShuket/redux/marts/Slice";
import { mainSlice } from "../app/modules/MShuket/redux/main/Slice";
import { fcmSlice } from "../app/modules/MShuket/redux/fcm/Slice";
import { imagesSlice } from "../app/modules/MShuket/redux/images/Slice";
import { productSlice } from "../app/modules/MShuket/redux/product/Slice";
import { deliverySlice } from "../app/modules/MShuket/redux/delivery/Slice";
import { usersSlice } from "../app/modules/MShuket/redux/users/Slice";
import { catalogSlice } from "../app/modules/MShuket/redux/catalog/Slice";
import { noticeSlice } from "../app/modules/MShuket/redux/notice/Slice";
import { orderSlice } from "../app/modules/MShuket/redux/order/Slice";

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
