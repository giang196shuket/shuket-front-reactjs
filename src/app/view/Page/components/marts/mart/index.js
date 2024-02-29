import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../module/partials/controls/index.js";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../../module/layout/index.js";
import { MartEditBasic } from "./MartEditBasic.js";
import { MartEditApp } from "./MartEditApp.js";
import { MartEditDelivery } from "./MartEditDelivery.js";

import { getDetailMart } from "../../../redux/marts/Thunk.js";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { FormattedMessage } from "react-intl";
import DatePicker from "rsuite/DatePicker";
import Radio from "rsuite/Radio";
import RadioGroup from "rsuite/RadioGroup";
import { getDistrictOptions } from "../../../redux/main/Thunk.js";
import {
  getCityOptions,
  getDBConnect,
  getPartnerOptions,
  getPosOptions,
  getTypeMart,
  getGroupOptions,
  getLevelOptions,
} from "../../../redux/main/Thunk.js";
import { uploadMartLogo } from "../../../redux/marts/Thunk.js";
import { businessTypeList, caseHeadOrFranch } from "./helper/UIHelper.js";
import { MartsFilter } from "./MartsFilter";
import { useMartsUIContext } from "./MartsUIContext";
import { injectIntl } from "react-intl";
import { MartsTable } from "./MartsTable";
import { MartsGrouping } from "./MartsGrouping";
import { useMemo } from "react";
import { isEqual } from "lodash";

import { keyTypeList, pickupTimeList } from "./helper/UIHelper.js";

import { Route } from "react-router-dom";

import MartsCard from "./MartsCard";
import { MartsUIProvider } from "./MartsUIContext";
import { toAbsoluteUrl } from "../../../../../../module/helpers/index.js";
import { createContext, useContext, useCallback } from "react";
import { isFunction } from "lodash";
import { initialFilter, initialAdd } from "./helper/UIHelper.js";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { useLang } from "../../../../../../module/i18n/index.js";
import { Pagination } from "../../../../../../module/partials/controls/index.js";
import { getMoaMartList } from "../../../redux/marts/Thunk.js";
import { getFcmOptions } from "../../../redux/fcm/Thunk.js";

import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../module/helpers/index.js";
import { StatusColumnFormatter } from "./helper/StatusColumnFormatter.js";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter.js";
import { ExportCSV } from "./helper/ExportCSV.js";
import { generateCSVName } from "../../../common/funtion";

import { MartEditPayment } from "./MartEditPayment";
import { MartEditContact } from "./MartEditContact";
import { MartEditSupcription } from "./MartEditSubcription.js";
import { MartEditAccStatus } from "./MartEditAccStatus.js";
import { MartEditBalance } from "./MartEditBalance.js";
import { MartEditService } from "./MartEditService.js";
import { MartEditBilling } from "./MartEditBilling.js";

import { FormCheck } from "react-bootstrap";
import { getPartnerSalesTeamOptions } from "../../../redux/main/Thunk";
import { updateMart, getListGroupMart } from "../../../redux/marts/Thunk";
import { resetMartEdit } from "../../../redux/marts/Slice";
import { Divider } from "./helper/Divider";
import { checkUserAdminId } from "../../../redux/users/Thunk";
import { toast } from "react-toastify";
import { addMart } from "../../../redux/marts/Thunk";

export {
  addMart,
  toast,
  checkUserAdminId,
  Divider,
  resetMartEdit,
  initialAdd,
  updateMart,
  getListGroupMart,
  getPartnerSalesTeamOptions,
  FormCheck,
  MartEditBilling,
  MartEditService,
  MartEditBalance,
  MartEditAccStatus,
  MartEditSupcription,
  MartEditContact,
  pickupTimeList,
  MartEditDelivery,
  MartEditPayment,
  getFcmOptions,
  MartEditApp,
  ExportCSV,
  generateCSVName,
  React,
  useEffect,
  useRef,
  useState,
  useMemo,
  shallowEqual,
  useDispatch,
  useSelector,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  LayoutSplashScreen,
  useSubheader,
  MartEditBasic,
  getDetailMart,
  format,
  Form,
  Formik,
  FormattedMessage,
  DatePicker,
  Radio,
  RadioGroup,
  getGroupOptions,
  getLevelOptions,
  getDistrictOptions,
  getCityOptions,
  getDBConnect,
  getPartnerOptions,
  getPosOptions,
  getTypeMart,
  uploadMartLogo,
  businessTypeList,
  caseHeadOrFranch,
  MartsFilter,
  useMartsUIContext,
  injectIntl,
  MartsTable,
  MartsGrouping,
  isEqual,
  keyTypeList,
  Route,
  MartsCard,
  MartsUIProvider,
  toAbsoluteUrl,
  createContext,
  useContext,
  useCallback,
  isFunction,
  initialFilter,
  BootstrapTable,
  paginationFactory,
  PaginationProvider,
  useLang,
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  Pagination,
  getMoaMartList,
  StatusColumnFormatter,
  ActionsColumnFormatter,
};
export {
  defaultSorted,
  sizePerPageList,
  statusList,
} from "../../../common/UIhelpers";
