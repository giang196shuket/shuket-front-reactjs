import React from "react";
import { StatusCssClasses, StatusTitles } from "../../../../common/UIhelpers";
export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      StatusCssClasses[cellContent]
    } label-inline`}
  >
    {StatusTitles[cellContent]}
  </span>
);
