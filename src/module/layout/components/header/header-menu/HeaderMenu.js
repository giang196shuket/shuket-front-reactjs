/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeftMenuBar } from "../../../../../app/view/Page/redux/main/Action";

export function HeaderMenu({ layoutProps }) {
  const { user } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(user.menu_list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== undefined) {
      dispatch(fetchLeftMenuBar());
    }
  }, [dispatch, user.token]);

  useEffect(() => {
    if (user.menu_list) {
      setMenu(user.menu_list);
    }
  }, [user.menu_list]);

  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };


  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className={`menu-item ${getMenuItemActive(`/m-shuket/dashboard`)}`}>
          <NavLink className="menu-link" to="/m-shuket/dashboard">
            <span className="menu-text">SHUKET Dashboard</span>
          </NavLink>
        </li>
        {user.menu_list &&
          user.menu_list.map((me) => {
            return (
              // eslint-disable-next-line jsx-a11y/role-supports-aria-props
              <li
                key={me.group_code}
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
                  `/m-shuket/${me.group_names?.en}`
                )}`}
              >
                <NavLink className="menu-link menu-toggle" to="/m-shuket">
                  <span className="menu-text">{me.group_names?.en}</span>
                  <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                  <ul className="menu-subnav">
                    {me.group_items.map((item) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                        <li
                          key={item.code}
                          className={`menu-item menu-item-submenu ${
                            item?.route
                              ? getMenuItemActive(
                                  `/m-shuket/${me.group_names?.en}` + item?.route
                                )
                              : getMenuItemActive(
                                  `/m-shuket/${me.group_names?.en}` +
                                    item.sub_items?.[0]?.route.substring(
                                      0,
                                      item.sub_items?.[0]?.route.lastIndexOf(
                                        "/",
                                        item.sub_items?.[0]?.route
                                      )
                                    )
                                )
                          }`}
                          data-menu-toggle="hover"
                          aria-haspopup="true"
                        >
                          {item.sub_items.length > 0 ? (
                            <>
                              {" "}
                              <NavLink
                                className="menu-link menu-toggle"
                                to={`/m-shuket${item?.route}`}
                              >
                                <span className="menu-text">
                                  {item.name?.en}
                                </span>
                                <i className="menu-arrow" />
                              </NavLink>
                              <div
                                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
                              >
                                <ul className="menu-subnav">
                                  {item.sub_items.map((it) => {
                                    return (
                                      <li
                                        key={it.code}
                                        className={`menu-item ${getMenuItemActive(
                                          `/m-shuket/${me.group_names?.en}` +
                                            it?.route
                                        )}`}
                                      >
                                        <NavLink
                                          className="menu-link"
                                          to={`/m-shuket/${me.group_names?.en}${it?.route}`}
                                        >
                                          <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                          </i>
                                          <span className="menu-text">
                                            {it.name?.en}
                                          </span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>{" "}
                            </>
                          ) : (
                            <NavLink
                              className="menu-link"
                              to={`/m-shuket/${me.group_names?.en}${item?.route}`}
                            >
                              <span className="menu-text">{item.name?.en}</span>
                            </NavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}

        {/*end:: Menu SHUKET ADMIN*/}
 
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
