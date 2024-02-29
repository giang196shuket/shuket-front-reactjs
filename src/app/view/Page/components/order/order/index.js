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
} from "../../../redux/main/Thunk.js";
import { businessTypeList, caseHeadOrFranch } from "./helper/UIHelper.js";
import { OrderFilter } from "./orderFilter.js";
import { useOrderUIContext } from "./orderUIContext.js";
import { injectIntl } from "react-intl";
import { OrderTable } from "./orderTable.js";
import { OrderGrouping } from "./orderGrouping.js";
import { useMemo } from "react";
import { isEqual } from "lodash";

import { keyTypeList } from "./helper/UIHelper.js";

import { Route } from "react-router-dom";

import OrderCard from "./orderCard.js";
import { OrderUIProvider } from "./orderUIContext.js";
import { toAbsoluteUrl } from "../../../../../../module/helpers/index.js";
import { createContext, useContext, useCallback } from "react";
import { isFunction } from "lodash";
import { initialFilter } from "./helper/UIHelper.js";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { useLang } from "../../../../../../module/i18n/index.js";
import { Pagination } from "../../../../../../module/partials/controls/index.js";
import { getOrderList } from "../../../redux/order/Thunk.js";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../module/helpers/index.js";
import { StatusColumnFormatter } from "./helper/StatusColumnFormatter.js";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter.js";
import { ExportCSVGroup } from "./helper/ExportCsvGroup.js";

import { generateCSVName } from "../../../common/funtion";
export {
  defaultSorted,
  sizePerPageList,
  statusList,
} from "../../../common/UIhelpers.js";
export {
  ExportCSVGroup,
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
  format,
  Form,
  Formik,
  FormattedMessage,
  DatePicker,
  Radio,
  RadioGroup,
  getDistrictOptions,
  getCityOptions,
  getDBConnect,
  getPartnerOptions,
  getPosOptions,
  getTypeMart,
  businessTypeList,
  caseHeadOrFranch,
  OrderFilter,
  useOrderUIContext,
  injectIntl,
  OrderTable,
  OrderGrouping,
  isEqual,
  keyTypeList,
  Route,
  OrderCard,
  OrderUIProvider,
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
  getOrderList,
  StatusColumnFormatter,
  ActionsColumnFormatter,
};
