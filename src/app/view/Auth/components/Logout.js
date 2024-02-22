import React from "react";
import { Redirect } from "react-router-dom";
import {injectIntl } from "react-intl";
import {connect } from 'react-redux';
import {authSlice} from "../redux/authSlice";
function Logout(props, history) {
  props.logoutAccount();
  return (<Redirect to="/auth/login" />);
}
export default injectIntl(connect(null, authSlice.actions)(Logout));