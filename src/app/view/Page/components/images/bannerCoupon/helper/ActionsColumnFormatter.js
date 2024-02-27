/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../module/helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {  openDelete, columnName }
) => (
  <>


    <> </>
    {openDelete &&  (
        <OverlayTrigger
        overlay={<Tooltip id="products-delete-tooltip">Delete images</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => openDelete(row[columnName])}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/images/svg/icons/General/Trash.svg")} />
          </span>
        </a>
      </OverlayTrigger>
    )}
  
  </>
);
