import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./catalogUIHelpers";
import { injectIntl } from "react-intl";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getListCatalog } from "../../../redux/catalog/Thunk";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../services/helpers";
import { Pagination } from "../../../../../../services/partials/controls";
import { useCatalogUIContext } from "./catalogUIContext";
import { StatusColumnFormatter } from "./helperTable/StatusColumnFormatter";
import { ActionsColumnFormatter } from "./helperTable/ActionsColumnFormatter";
import { defaultSorted, sizePerPageList } from "../../../Helpers/UIhelpers";
import { useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../services/partials/controls/index.js";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../../services/layout/index.js";

import { Formik } from "formik";
import { FormattedMessage } from "react-intl";
import CatalogTable from "./catalogTable";
import { CatalogUIProvider } from "./catalogUIContext";
import CatalogCart from "./catalogCart";
export {Formik, FormattedMessage,CatalogUIProvider,CatalogCart,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  LayoutSplashScreen,
  CatalogTable,
  useSubheader,
  createContext,
  useContext,
  useState,
  useCallback,
  isEqual,
  isFunction,
  initialFilter,
  injectIntl,
  useEffect,
  useMemo,
  shallowEqual,
  useDispatch,
  useSelector,
  getListCatalog,
  BootstrapTable,
  PaginationProvider,
  paginationFactory,
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  Pagination,
  useCatalogUIContext,
  StatusColumnFormatter,
  ActionsColumnFormatter,
  defaultSorted,
  sizePerPageList,
  useRef,
};
