/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toAbsoluteUrl } from "../../../../../helpers";
import { useDispatch } from "react-redux";
import { userSwitchAccount } from "../../../../../../app/view/Auth/redux/authThunk";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function SearchResult({ data, clear }) {
  const dispatch = useDispatch();
  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div
        style={{ maxHeight: "325px", overflow: "hidden" }}
        className="quick-search-wrapper scroll ps ps--active-y"
      >
        <div className="quick-search-result">
          <div className="text-muted d-none">No record found</div>
        </div>
      </div>
    );
  }

  const handleSwitch = (user_acc) => {
    dispatch(userSwitchAccount(user_acc))
    clear()

  }
  return (
    <div
      style={{ maxHeight: "325px", overflow: "hidden" }}
      className="quick-search-wrapper scroll ps ps--active-y"
    >
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll"
        style={{ maxHeight: "325px", position: "relative" }}
      >
        <div className="quick-search-result">


          {/* begin: Section */}
          <div className="font-size-sm text-primary font-weight-bolder text-uppercase mb-2">
            ACCOUNT MART
          </div>
          <div className="mb-10">
         

            {data?.map((acc) => {
              return (
                <div className="d-flex align-items-center flex-grow-1 mb-2">
                  <div className="symbol symbol-45 symbol-circle flex-shrink-0">
                    <div className="symbol-label">
                      <i className="flaticon2-supermarket text-warning"></i>
                    </div>
                  </div>
                  <div className="d-flex flex-column ml-3 mt-2 mb-2">
                    <a
                      href="#!"
                      onClick={()=>handleSwitch(acc.user_acc)}
                      className="font-weight-bold text-dark text-hover-primary"
                    >
                      {acc.user_name}
                    </a>
                    <span className="font-size-sm font-weight-bold text-muted">
                      {acc.user_acc}
                    </span>
                  </div>
                </div>
              );
            })}
           
          </div>
          {/* end: Section */}
        </div>
      </PerfectScrollbar>
    </div>
  );
}
