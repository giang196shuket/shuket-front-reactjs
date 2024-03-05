/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../module/helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEdit, columnName }
) => (
  <>
 <OverlayTrigger
 overlay={<Tooltip id="products-edit-tooltip">Register product</Tooltip>}
>
 <a
   className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
   onClick={() => openEdit(row[columnName])}
 >
   <span className="svg-icon svg-icon-md svg-icon-primary">
     <SVG
       src={toAbsoluteUrl("/images/svg/icons/Communication/Write.svg")}
     />
   </span>
 </a>
</OverlayTrigger>
   

 
  
  </>
);
