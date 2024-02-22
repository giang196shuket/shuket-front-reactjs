import React from "react";
import { LayoutSplashScreen, useSubheader } from "../../../../module/layout";
import { useSelector } from "react-redux";
import { Demo1Dashboard } from "../../../../module/partials/dashboards/Demo1Dashboard";

export function DashBoardPage() {
  const { user } = useSelector((state) => state.auth);
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");
  document.title = "My page title";

  return <>{user.menu_list ? <Demo1Dashboard /> : <LayoutSplashScreen />}</>;
}
