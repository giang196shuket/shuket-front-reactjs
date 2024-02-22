
import axios from "axios";
import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.scss"; // Standard version
import * as redux from "./store";
import store, { persistor } from "./store/store";
// import "./sass/style.react.rtl.css"; // RTL version
import "@fortawesome/fontawesome-free/css/all.min.css";
import "socicon/css/socicon.css";
import "./module/assets/plugins/flaticon/flaticon.css";
import "./module/assets/plugins/flaticon2/flaticon.css";
import "./module/assets/plugins/keenthemes-icons/font/ki.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import { MetronicI18nProvider } from "./module/i18n";
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider
} from "./module/layout";


const { PUBLIC_URL } = process.env;


redux.setupAxios(axios, store);

ReactDOM.render(
  <MetronicI18nProvider>
    <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
        <MetronicSplashScreenProvider>
          <App store={store} persistor={persistor} basename={PUBLIC_URL} />
        </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
    </MetronicLayoutProvider>
  </MetronicI18nProvider>,
  document.getElementById("root")
);
