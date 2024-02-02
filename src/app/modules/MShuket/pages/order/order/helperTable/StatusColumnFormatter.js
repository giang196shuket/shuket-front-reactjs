import React from "react";
import { StatusCssClasses, StatusTitles } from "../../../../Helpers/UIhelpers";
export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      StatusCssClasses[cellContent]
    } label-inline`}
  >
    {StatusTitles[cellContent]}
  </span>
);
