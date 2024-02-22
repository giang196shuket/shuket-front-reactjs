import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./helper/UIHelper";
import { injectIntl } from "react-intl";
import { useEffect, useMemo } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
} from "../../../../../../module/helpers";
import { Pagination } from "../../../../../../module/partials/controls";
import { useProductBarcodeUIContext } from "./productBarcodeUIContext";
import { getListImagesWithBarcode } from "../../../redux/images/Thunk";
import { ActionsColumnFormatter } from "./helper/ActionsColumnFormatter";
import { defaultSorted, sizePerPageList } from "../../../common/UIhelpers";
import DatePicker from "rsuite/DatePicker";

import { Formik } from "formik";

import {
  ImageCategories,
  statusList,
  keyImagesList,
} from "./helper/UIHelper";
import { sortType } from "../../../common/UIhelpers";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../module/partials/controls";

import ProductBarcodeTable from "./productBarcodeTable";
import { ProductBarcodeGrouping } from "./productBarcodeGrouping";
import { ProductBarcodeFilter } from "./productBarcodeFilter";

import {
  addImagesCouponBanner,
  getCatesImages,
} from "../../../redux/images/Thunk";
import SwitchesCustom from "./helper/Switches"
import { format } from "date-fns";

export {
  format,
  DatePicker,
  SwitchesCustom,
  Formik,
  ImageCategories,
  keyImagesList,
  sortType,
  statusList,
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ProductBarcodeTable,
  ProductBarcodeGrouping,
  ProductBarcodeFilter,
  addImagesCouponBanner,
  getCatesImages,
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
  BootstrapTable,
  paginationFactory,
  PaginationProvider,
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  Pagination,
  useProductBarcodeUIContext,
  getListImagesWithBarcode,
  ActionsColumnFormatter,
  defaultSorted,
  sizePerPageList,
};
