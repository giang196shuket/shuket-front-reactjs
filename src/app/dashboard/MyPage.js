import React from "react";
import {useSubheader} from "../../module/layout";

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("SHUKET SERVICE");
  document.title = "SHUKET SERVICE";

  return (<>My Page</>);
};
