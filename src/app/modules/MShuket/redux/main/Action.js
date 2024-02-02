import store from "../../../../../redux/store";
import { updateMenu } from "../../../Auth/redux/authSlice";
import { fulfilledCall, pendingCall, rejectedCall } from "./Slice";
import { getMenuLeftBar } from "./Thunk";

export const fetchLeftMenuBar = () => (dispatch) => {
    dispatch(pendingCall());
    return getMenuLeftBar()
      .then((response) => {
        if (response.data.code === 200) {
          dispatch(fulfilledCall());
          dispatch(updateMenu(response.data.data.left_menu));
          return true
        } else {
          const error = response.data.errors;
          dispatch(rejectedCall(error));
          return false
        }
      })
      .catch((error) => {
        error.clientMessage = "Failed";
        dispatch(rejectedCall(error));
      });
};
