import React from "react";
import {useSubheader} from "../../module/layout";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("My Custom title");
  document.title = "My page title";

  return (<>My Page</>);
};
