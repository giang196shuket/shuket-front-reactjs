import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../module/layout";
import { BuilderPage } from "./dashboard/BuilderPage";
import { MyPage } from "./dashboard/MyPage";
import { DashboardPage } from "./dashboard/DashboardPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotication } from "./view/Auth/redux/authSlice";
import { getMessagingToken } from "../firebase";

const GoogleMaterialPage = lazy(() =>
  import("./view/Extras/MaterialUI/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./view/Extras/ReactBootstrap/ReactBootstrapPage")
);

const Page = lazy(() =>
  import("./view/Page/components/page")
);
export default function BasePage() {
 //get notification from server woker and FCM
 const dispatch = useDispatch();

 useEffect(() => {
   getMessagingToken();
   const channel = new BroadcastChannel("notifications");
   channel.addEventListener("message", (payload) => {
     console.log("background noti", payload.data);
     dispatch(addNotication({...payload.data.data, messageId: payload.data.messageId}));

   });
 },[])
 
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/m-shuket" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/m-shuket" component={Page} />
        <Redirect path="*" to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
