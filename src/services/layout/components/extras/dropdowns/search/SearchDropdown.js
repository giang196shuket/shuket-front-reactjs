import React, { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../../_core/MetronicLayout";
import { SearchResult } from "./SearchResult";
import { toAbsoluteUrl } from "../../../../../helpers";
import { DropdownTopbarItemToggler } from "../../../../../partials/dropdowns";
import { useDispatch } from "react-redux";
import { getListAccountSwitch } from "../../../../../../app/modules/Auth/redux/authThunk";

export function SearchDropdown() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [listMart, setListMart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAccountSwitch())
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setListMart(res.data);
        }
      })
      .catch((err) => {});
  }, [dispatch]);
  let timeoutId;

  const clearTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    setData(null);

    if (event.target.value.length > 1) {
      // clearTimeout();

      setLoading(true);

      // simulate getting search result
      // timeoutId = setTimeout(() => {

      setData(
        listMart.filter(
          (ls) =>
            ls?.user_name !== null && ls?.user_name.includes(event.target.value)
        )
      );
      setLoading(false);
      // }, 500);
    }
  };

  const clear = () => {
    setData(null);
    setLoading(false);
    setSearchValue("");
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.search.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1"
            id="kt_quick_search_toggle"
          >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")} />
            </span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown
          alignRight
          drop="down"
          onToggle={() => {
            setData(null);
            setLoading(false);
            setSearchValue("");
          }}
          id="kt_quick_search_toggle"
        >
          <Dropdown.Toggle as={DropdownTopbarItemToggler}>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="search-panel-tooltip">Quick search</Tooltip>
              }
            >
            <div
              className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1 "
          
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                />
              </span>
            </div>
            </OverlayTrigger>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <div
              id="kt_quick_search_dropdown"
              className={clsx("quick-search quick-search-dropdown", {
                "quick-search-has-result": data && data.length,
              })}
            >
              <form className="quick-search-form">
                <div className="input-group">
                  <div className={`input-group-prepend`}>
                    <span className="input-group-text">
                      <span className="svg-icon svg-icon-lg">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/Search.svg"
                          )}
                        />
                      </span>
                    </span>
                  </div>
                  <input
                    type="text"
                    autoFocus={true}
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="form-control"
                  />

                  <div
                    className={`input-group-append ${
                      loading ? "spinner spinner-sm spinner-primary" : ""
                    }")}`}
                  >
                    <span className="input-group-text">
                      <i
                        style={{
                          display:
                            loading && searchValue && searchValue.length > 0
                              ? "none"
                              : "flex",
                        }}
                        onClick={clear}
                        className="quick-search-close ki ki-close icon-sm text-muted"
                      />
                    </span>
                  </div>
                </div>
              </form>
              <SearchResult data={data} clear={clear} />
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
