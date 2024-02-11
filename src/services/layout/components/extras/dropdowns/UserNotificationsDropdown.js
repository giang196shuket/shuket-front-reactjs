/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect } from "react";
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../helpers";
import { DropdownTopbarItemToggler } from "../../../../partials/dropdowns";
import { messaging, getMessagingToken  } from "../../../../../firebase";
import { onMessage } from "firebase/messaging";
import { useDispatch, useSelector } from "react-redux";
import { addNotication, fetchNotifcationSchedule } from "../../../../../app/modules/Auth/redux/authSlice";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {
  const [key, setKey] = useState("Events");
  const bgImage = toAbsoluteUrl("/images/misc/bg-1.jpg");
  const { notications } = useSelector((state) => state.auth);
  const { noticationsSchedule } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.notifications.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  const onMessageListener = () => {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("foreground noti", payload);
        dispatch(addNotication({...payload.data,messageId: payload.messageId}));
        resolve(payload);
      });
    });
  };

  //get client device web
  useEffect(() => {
    getMessagingToken ();
  }, []);

  //call get message
  useEffect(() => {
    onMessageListener();
  });


  useEffect(() => {
    //khi vừa vào trang
    dispatch(fetchNotifcationSchedule())

    const intervalId = setInterval(() => {
        dispatch(fetchNotifcationSchedule())
    }, 1000 * 60); //gọi làm hàm sau mỗi phút

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  return (
    <>
      {/* {layoutProps.offcanvas && ( */}
      {/* <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
            id="kt_quick_notifications_toggle"
          >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl("/images/svg/icons/Code/Compiling.svg")} />
            </span>
            <span className="pulse-ring"></span>
          </div>
        </div> */}
      {/* )} */}
      {!layoutProps.offcanvas && (
      <Dropdown drop="down" alignRight>
        <Dropdown.Toggle
          as={DropdownTopbarItemToggler}
          id="kt_quick_notifications_toggle"
        >
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="user-notification-tooltip">
                User Notifications
              </Tooltip>
            }
          >
            <div
              className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
              id="kt_quick_notifications_toggle"
            >
              {/* <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl("/images/svg/icons/Code/Compiling.svg")}
                />
              </span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell-fill text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              <span className="badge rounded-pill badge-notification bg-success text-light">
                {notications.length}
              </span>

              <span className="pulse-ring"></span>
              <span className="pulse-ring" />
            </div>
          </OverlayTrigger>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
          <form>
            <div
              className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <h4 className="d-flex flex-center rounded-top">
                <span className="text-white">User Notifications</span>
                <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                  {notications.length} new
                </span>
              </h4>

              <Tab.Container defaultActiveKey={key}>
                <Nav
                  as="ul"
                  className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                  onSelect={(_key) => setKey(_key)}
                >
                
                  <Nav.Item as="li">
                    <Nav.Link
                      eventKey="Events"
                      className={`nav-link show ${
                        key === "Events" ? "active" : ""
                      }`}
                    >
                      Events
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item" as="li">
                    <Nav.Link
                      eventKey="Alerts"
                      className={`nav-link show ${
                        key === "Alerts" ? "active" : ""
                      }`}
                    >
                      Alerts
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link
                      eventKey="Logs"
                      className={`nav-link show ${
                        key === "Logs" ? "active" : ""
                      }`}
                    >
                      Logs
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="tab-content">
                  <Tab.Pane eventKey="Alerts" className="p-8">
                    <PerfectScrollbar
                      options={perfectScrollbarOptions}
                      className="scroll pr-7 mr-n7"
                      style={{ maxHeight: "300px", position: "relative" }}
                    >
                      <div className="d-flex align-items-center mb-6">
                        <div className="symbol symbol-40 symbol-light-primary mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Home/Library.svg"
                              )}
                              className="svg-icon-lg svg-icon-primary"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-6">
                        <div className="symbol symbol-40 symbol-light-warning mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Communication/Write.svg"
                              )}
                              className="svg-icon-lg svg-icon-warning"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark-75 text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-6">
                        <div className="symbol symbol-40 symbol-light-success mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Communication/Group-chat.svg"
                              )}
                              className="svg-icon-lg svg-icon-success"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-6">
                        <div className="symbol symbol-40 symbol-light-danger mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/General/Attachment2.svg"
                              )}
                              className="svg-icon-lg svg-icon-danger"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="symbol symbol-40 symbol-light-info mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/General/Attachment2.svg"
                              )}
                              className="svg-icon-lg svg-icon-info"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="symbol symbol-40 symbol-light-info mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Communication/Mail-notification.svg"
                              )}
                              className="svg-icon-lg svg-icon-info"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="symbol symbol-40 symbol-light-info mr-5">
                          <span className="symbol-label">
                            <SVG
                              src={toAbsoluteUrl(
                                "/images/svg/icons/Design/Bucket.svg"
                              )}
                              className="svg-icon-lg svg-icon-info"
                            ></SVG>
                          </span>
                        </div>
                        <div className="d-flex flex-column font-weight-bold">
                          <a
                            href="#"
                            className="text-dark text-hover-primary mb-1 font-size-lg"
                          >
                            Briviba SaaS
                          </a>
                          <span className="text-muted">
                            PHP, SQLite, Artisan CLIмм
                          </span>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </Tab.Pane>
                  <Tab.Pane eventKey="Events" id="topbar_notifications_events">
                    <PerfectScrollbar
                      options={perfectScrollbarOptions}
                      className="navi navi-hover scroll my-4"
                      style={{ maxHeight: "300px", position: "relative" }}
                    >
                      {/* <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-line-chart text-success"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New report has been received
                            </div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-paper-plane text-danger"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              Finance report has been generated
                            </div>
                            <div className="text-muted">25 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-user flaticon2-line- text-success"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New order has been received
                            </div>
                            <div className="text-muted">2 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-pin text-primary"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New customer is registered
                            </div>
                            <div className="text-muted">3 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-sms text-danger"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              Application has been approved
                            </div>
                            <div className="text-muted">3 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-pie-chart-3 text-warning"></i>
                          </div>
                          <div className="navinavinavi-text">
                            <div className="font-weight-bold">
                              New file has been uploaded
                            </div>
                            <div className="text-muted">5 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon-pie-chart-1 text-info"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New user feedback received
                            </div>
                            <div className="text-muted">8 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-settings text-success"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              System reboot has been successfully completed
                            </div>
                            <div className="text-muted">12 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon-safe-shield-protection text-primary"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New order has been placed
                            </div>
                            <div className="text-muted">15 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-notification text-primary"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              Company meeting canceled
                            </div>
                            <div className="text-muted">19 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-fax text-success"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New report has been received
                            </div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon-download-1 text-danger"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              Finance report has been generated
                            </div>
                            <div className="text-muted">25 hrs ago</div>
                          </div>
                        </div>
                      </a>

                      <a href="#" className="navi-item">
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon-security text-warning"></i>
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">
                              New customer comment recieved
                            </div>
                            <div className="text-muted">2 days ago</div>
                          </div>
                        </div>
                      </a> */}

                      {notications.map((noti) => {
                        return (
                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-analytics-1 text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  {noti.title}
                                </div>
                                <div className="text-muted">
                                  {" "}
                                  {new Date(noti.time).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </PerfectScrollbar>
                  </Tab.Pane>
                  <Tab.Pane eventKey="Logs" id="topbar_notifications_logs">
                    <div className="d-flex flex-center text-center text-muted min-h-200px">
                      All caught up!
                      <br />
                      No new notifications.
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </form>
        </Dropdown.Menu>
      </Dropdown>
      )}
    </>
  );
}
