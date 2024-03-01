/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../module/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../module/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ store, persistor, basename }) {
  return (
    <>
      <Provider store={store}>
        {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
        <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
          {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
          <React.Suspense fallback={<LayoutSplashScreen />}>
            {/* Override `basename` (e.g: `homepage` in `package.json`) */}
            <BrowserRouter basename={basename}>
              {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
              <MaterialThemeProvider>
                {/* Provide `react-intl` context synchronized with Redux state.  */}
                <I18nProvider>
                  {/* Render routes with provided `Layout`. */}
                  <Routes />
                </I18nProvider>
              </MaterialThemeProvider>
            </BrowserRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}
