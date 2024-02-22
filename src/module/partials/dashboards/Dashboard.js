import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../layout";


export function Dashboard() {
  const uiService = useHtmlClassService();
  console.log('Go to dashboard', uiService);
  const layoutProps = useMemo(() => {
    return {
      shuket: objectPath.get(
        uiService.config,
        "shuket"
      )
    };
  }, [uiService]);
  console.log('Layout', layoutProps);
  return <>
    {/* {layoutProps.shuket === 'shuket1' && <Demo1Dashboard />} */}
  </>;
}
