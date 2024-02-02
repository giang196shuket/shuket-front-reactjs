import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reduxBatch } from "@manaflair/redux-batch";
import { persistStore } from "redux-persist";
import { rootReducer, rootSaga } from "./rootReducer";
import logger from 'redux-logger';
import  { middlewareError } from './middlewareCatch'

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
  logger,
  middlewareError,
  sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch]
});


export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
