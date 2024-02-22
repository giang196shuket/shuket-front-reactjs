import React, { useMemo } from "react";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { SearchDropdown } from "../extras/dropdowns/search/SearchDropdown";
import { UserNotificationsDropdown } from "../extras/dropdowns/UserNotificationsDropdown";
import { QuickActionsDropdown } from "../extras/dropdowns/QuickActionsDropdown";
import { MyCartDropdown } from "../extras/dropdowns/MyCartDropdown";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuiclUserToggler";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { resetAccount } from "../../../../app/view/Auth/redux/authThunk";

export function Topbar() {
  const uiService = useHtmlClassService();
  const user = useSelector((state) => state.auth);
  const isChange = jwtDecode(user.authToken)?.is_change;
  const dispatch = useDispatch()

  const handelReset = () =>{
    dispatch(resetAccount())
  }

  const layoutProps = useMemo(() => {
    return {
      viewSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      viewNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      viewQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      viewCartDisplay: objectPath.get(uiService.config, "extras.cart.display"),
      viewQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      viewLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
    };
  }, [uiService]);

  return (
    <div className="topbar">
      {layoutProps.viewSearchDisplay && <SearchDropdown />}

      {isChange === 1 && (
        <div className="topbar-item" title="Quick panel">
          <div className="btn btn-icon btn-clean btn-lg mr-1">
            <span
              onClick={() => handelReset()}
              className="svg-icon svg-icon-xl svg-icon-primary"
            >
              <SVG src={toAbsoluteUrl("/images/svg/icons/Media/Repeat.svg")} />
            </span>
          </div>
        </div>
      )}

      {layoutProps.viewNotificationsDisplay && <UserNotificationsDropdown />}

      {layoutProps.viewQuickActionsDisplay && <QuickActionsDropdown />}

      {layoutProps.viewCartDisplay && <MyCartDropdown />}

      {layoutProps.viewQuickPanelDisplay && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-panel-tooltip">Quick panel</Tooltip>}
        >
          <div
            className="topbar-item"
            data-toggle="tooltip"
            title="Quick panel"
            data-placement="right"
          >
            <div
              className="btn btn-icon btn-clean btn-lg mr-1"
              id="kt_quick_panel_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl(
                    "/images/svg/icons/Layout/Layout-4-blocks.svg"
                  )}
                />
              </span>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {layoutProps.viewLanguagesDisplay && <LanguageSelectorDropdown />}

      {layoutProps.viewUserDisplay && <QuickUserToggler />}
    </div>
  );
}
